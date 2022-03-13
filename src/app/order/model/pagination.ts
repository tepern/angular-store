interface Pagination { 
  countVar: number;
  pageVar: number;
  perPageVar: number;
  pagesToShow: number;
  loadingVar: boolean;
}

export const pagination: Pagination = {
  countVar: 0,
  pageVar: 1,
  perPageVar: 20,
  pagesToShow: 4,
  loadingVar: false
};