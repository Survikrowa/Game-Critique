export type GraphQLError = {
  message: string;
  locations: Location[];
  path: string[];
  extensions: {
    code: string;
    stacktrace: string[];
    originalError?: {
      message: string;
      error: string;
      statusCode: number;
    };
  };
};

type Location = {
  line: number;
  column: number;
};

export const parseGraphQLErrors = (errors: GraphQLError[]): number | null => {
  if (!errors || errors.length === 0) {
    return null;
  }

  for (const error of errors) {
    const { originalError } = error.extensions;

    if (originalError) {
      return originalError.statusCode;
    }
  }

  return null;
};
