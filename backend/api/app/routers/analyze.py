#!/usr/bin/env python
# -*- coding: utf-8 -*-

from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.event_handler.api_gateway import Router, Response
from aws_lambda_powertools.event_handler import content_types

__all__ = ["router"]

tracer = Tracer()
logger = Logger(child=True)
metrics = Metrics()
router = Router()

@router.get("/")
@tracer.capture_method(capture_response=False)
def get_analyze_result():
    logger.info("Fetching analyze result")
    
    result = "Analyzed Result!!!"
    
    response = Response(
        status_code=200,
        content_type=content_types.APPLICATION_JSON,
        body={"result": result}
    )
    
    return response