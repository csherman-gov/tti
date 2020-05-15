import logging

from django.http import (
    HttpResponseBadRequest,
    HttpResponseForbidden,
    HttpResponseNotFound,
)

# from django.utils.decorators import method_decorator
# from django.views import View
# from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from api.models import SurveyResult, User
from api.sfdc_restful.SFDC import SFDC

LOGGER = logging.getLogger(__name__)


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResult
        fields = [
            "id",
            "create_timestamp",
            "update_timestamp",
            "collection",
            "survey_type",
            "result",
            "user_id",
        ]

class SurveySubmission(APIView):
    def post(self, request, *args, **kwargs):
        collection = kwargs.get("collection")
        if not collection:
            return HttpResponseBadRequest("Missing survey collection")
        survey_type = kwargs.get("type")
        if not survey_type:
            return HttpResponseBadRequest("Missing survey type")
        survey_type = survey_type[:32]
        body = request.data
        if not body:
            return HttpResponseBadRequest("Missing application results")

        sSFDC_org = 'qa'
        sf_instance = SFDC(sSFDC_org)
        sfdc_result = sf_instance.submitForm(
            url = 'CaseManagement/v1',
            payload = request
        )

        return Response(
            {
                "collection": collection,
                "type": survey_type,
                "status": "ok",
                "result": sfdc_result
            }
        )



# @method_decorator(csrf_exempt, name='dispatch')
class SurveyResultView(APIView):
    """Manage survey results"""

    permission_classes = (permissions.IsAuthenticated,)

    def get_request_user_id(self, request):
        # return isinstance(request.user, User) and request.user.authorization_id
        return isinstance(request.user, User) and request.user.id

    def get(self, request, *args, **kwargs):
        collection = kwargs.get("collection")
        if not collection:
            return HttpResponseBadRequest("Missing survey collection")
        survey_type = kwargs.get("type")
        if not survey_type:
            return HttpResponseBadRequest("Missing survey type")
        collection = collection[:32]
        survey_type = survey_type[:32]
        uid = self.get_request_user_id(request)
        if not uid:
            return HttpResponseForbidden("Missing user ID")
        key = kwargs.get("id")
        key = key[:32] if key else None

        if key:
            try:
                result = SurveyResult.objects.get(
                    collection=collection, survey_type=survey_type, id=key, user_id=uid
                )
            except SurveyResult.DoesNotExist:
                return HttpResponseNotFound()
            # FIXME query param to make most recent?
            return Response(SurveySerializer(result).data)

        results = SurveyResult.objects.filter(
            collection=collection, survey_type=survey_type, user_id=uid
        ).all()
        return Response({"result": SurveySerializer(results, many=True).data})

    def post(self, request, *args, **kwargs):
        collection = kwargs.get("collection")
        if not collection:
            return HttpResponseBadRequest("Missing survey collection")
        survey_type = kwargs.get("type")
        if not survey_type:
            return HttpResponseBadRequest("Missing survey type")
        survey_type = survey_type[:32]
        uid = self.get_request_user_id(request)
        if not uid:
            return HttpResponseForbidden("Missing user ID")
        body = request.data
        if not body:
            return HttpResponseBadRequest("Missing application results")
        key = kwargs.get("id")
        key = key[:32] if key else None

        if key:
            try:
                result = SurveyResult.objects.get(
                    collection=collection, survey_type=survey_type, id=key, user_id=uid
                )
            except SurveyResult.DoesNotExist:
                return HttpResponseNotFound()
        else:
            result = SurveyResult(
                collection=collection, survey_type=survey_type, user_id=uid
            )
        result.result = body
        result.save()

        sSFDC_org = 'qa'
        sf_instance = SFDC(sSFDC_org)
        sfdc_result = sf_instance.submitForm(
            url = 'CaseManagement/v1',
            payload = request
        )

        return Response(
            {
                "user_id": uid,
                "collection": collection,
                "type": survey_type,
                "id": result.id,
                "status": "ok",
                "result": sfdc_result
            }
        )

    def delete(self, request, *args, **kwargs):
        collection = kwargs.get("collection")
        if not collection:
            return HttpResponseBadRequest("Missing survey collection")
        survey_type = kwargs.get("type")
        if not survey_type:
            return HttpResponseBadRequest("Missing survey type")
        collection = collection[:32]
        survey_type = survey_type[:32]
        uid = self.get_request_user_id(request)
        if not uid:
            return HttpResponseForbidden("Missing user ID")
        key = kwargs.get("id")
        if not key:
            return HttpResponseForbidden("Missing survey ID")

        try:
            result = SurveyResult.objects.get(
                collection=collection, survey_type=survey_type, id=key, user_id=uid
            )
        except SurveyResult.DoesNotExist:
            return HttpResponseNotFound()
        result.delete()

        return Response({})
