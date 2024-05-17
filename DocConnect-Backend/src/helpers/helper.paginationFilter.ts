type TOption = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
};

type TReturnOption = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePaginationFiltering = (option: TOption): TReturnOption => {
  const page: number = Number(option.page) || 1;
  const limit: number = Number(option.limit) || 10;
  const skip: number = (Number(page) - 1) * Number(limit);

  const sortBy: string = option.sortBy || "createdAt";
  const sortOrder: string = option.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const helperFunction = {
  calculatePaginationFiltering,
};
