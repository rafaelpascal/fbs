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
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

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
        const response = await fetch(proxyUrl + file);
        // if (!response.ok) {
        //   throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        // }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const pdf = await getDocument(url).promise;
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
    try {
      const page = await pdf.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (canvas && context) {
        const rotation = page.rotate || 0; // Get rotation from PDF metadata
        const adjustedViewport = page.getViewport({
          scale: 1,
          rotation: rotation, // Apply the rotation here
        });

        // Ensure the canvas dimensions match the viewport
        canvas.width = adjustedViewport.width;
        canvas.height = adjustedViewport.height;

        // Render the page on the canvas with the correct rotation
        const renderContext = {
          canvasContext: context,
          viewport: adjustedViewport,
        };
        await page.render(renderContext).promise;
      }
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  };

  useEffect(() => {
    const renderPdf = async () => {
      const pdf = await getDocument(file).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (canvas && context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;
      }
    };
    renderPdf();
  }, [file]);
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
