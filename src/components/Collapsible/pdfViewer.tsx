import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Set the workerSrc for pdf.js (matching API version)
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js`;

const PdfViewer = forwardRef(({ file }: { file: string }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        const pdf = await getDocument(file).promise;
        setNumPages(pdf.numPages);
        renderPage(pageNumber, pdf);
      } catch (error) {
        console.error("Error loading PDF:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [file, pageNumber]);

  const renderPage = async (pageNum: number, pdf: any) => {
    const page = await pdf.getPage(pageNum);
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      const viewport = page.getViewport({ scale: 1 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      page.render({
        canvasContext: context,
        viewport: viewport,
      });
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // Expose the methods and the current page number, and total pages to the parent component
  useImperativeHandle(ref, () => ({
    goToNextPage,
    goToPrevPage,
    getCurrentPageNumber: () => pageNumber,
    getTotalPages: () => numPages,
    toggleFullscreen: () => {
      const viewer = viewerRef.current;
      if (viewer) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          viewer.requestFullscreen();
        }
      }
    },
  }));

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full overflow-x-auto" ref={viewerRef}>
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
});

export default PdfViewer;
