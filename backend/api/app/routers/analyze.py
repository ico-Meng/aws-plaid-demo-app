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

@router.get("/graphql")
@tracer.capture_method(capture_response=False)
def handle_graphql_query():
    try:
        # This is a simplified example. In a real-world scenario,
        # you'd parse the GraphQL query and respond accordingly.
        result = "Analyzed Result!!!"
        
        response = {
            "data": {
                "getAnalyzeResult": {
                    "result": result
                }
            }
        }
        
        return Response(
            status_code=200,
            content_type=content_types.APPLICATION_JSON,
            body=response
        )
    except Exception as e:
        logger.error(f"Error in handle_graphql_query: {str(e)}")
        error_response = {
            "errors": [
                {
                    "message": str(e),
                    "locations": [],
                    "path": ["getAnalyzeResult"]
                }
            ],
            "data": None
        }
        return Response(
            status_code=500,
            content_type=content_types.APPLICATION_JSON,
            body=error_response
        )