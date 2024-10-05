interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, maxPage }) => {
  return (
    <div>
      {page > 1 && (
        <button type="button" onClick={() => setPage(page - 1)}>
          Previous page
        </button>
      )}
      <span>{page}</span>
      {page < maxPage && (
        <button type="button" onClick={() => setPage(page + 1)}>
          Next page
        </button>
      )}
    </div>
  );
};

export default Pagination;