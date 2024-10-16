import { util } from '@aws-appsync/utils';

/**
 * Request handler for the getAnalyzeResult query
 *
 * @param ctx the request context
 */
export function request(ctx) {
  // Since the analyze.py function doesn't require any specific input,
  // we can return an empty payload or any necessary static data.
  const { username } = ctx.identity;
  const { id, limit = 20, cursor: nextToken } = ctx.arguments;

  return {
    operation: 'Query',
    query: {
      expression: '#pk = :pk AND begins_with(#sk, :sk)',
      expressionNames: {
        '#pk': 'gsi1pk',
        '#sk': 'gsi1sk',
      },
      expressionValues: util.dynamodb.toMapValues({
        ':pk': `USER#${username}#ITEM#${id}#ANALYZE`,
        ':sk': 'ANALYZE#',
      }),
    },
    index: 'GSI1',
    scanIndexForward: false,
    limit,
    nextToken,
  };
}

/**
 * Response handler for the getAnalyzeResult query
 *
 * @param ctx the request context
 */
export function response(ctx) {
    /*
  const { error, result } = ctx;
  if (error) {
    // Append error details if any error occurs
    return util.appendError(error.message, error.type, result);
  }

  // Ensure the result is not null and return the expected structure
  if (result && result.data && result.data.getAnalyzeResult) {
    return result.data.getAnalyzeResult;
  }

  // Return a default error message if the result is unexpectedly null
  return {
    result: "An error occurred during analysis"
  };
  */
  return {
    result: "Resolver test analyze result"
  }
}