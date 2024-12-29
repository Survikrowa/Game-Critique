export const getErrorToastBody = (statusCode: number) => {
  if (statusCode === 403) {
    return {
      title: "Forbidden",
      description: "You do not have permission to access this resource",
      variant: "destructive" as const,
    };
  }

  return {
    title: "Error",
    description: "An error occurred while fetching data",
    variant: "destructive" as const,
  };
};
