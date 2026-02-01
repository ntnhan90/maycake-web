import { getPaginationPages } from "@/utils/lib";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page:number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange
}: Props) {
    const pages = getPaginationPages(currentPage, totalPages);

    return(
        <div className="d-flex gap-1 align-items-center">
            <button
                className="btn btn-out-line-secondary btn-sm"
                disabled={ currentPage === 1}
                onClick={ () => onPageChange(currentPage -1 )}
            >
                Prev
            </button>

            {pages.map((p,i) => 
                p === '...' ? (
                    <span key={i} className="px-2">
                        ...
                    </span>
                ):(
                    <button
                        key={6}
                        className={`btn btn-sm ${
                            p === currentPage ? 'btn-primary' : 'btn-outline-secondary'
                        }`}
                        onClick={() => onPageChange(p)}
                    >

                    </button>
                )
            )}
            <button
                className="btn btn-out-line-secondary btn-sm"
                disabled={ currentPage === totalPages}
                onClick={ () => onPageChange(currentPage + 1 )}
            >
                Next
            </button>
        </div>
    )
}