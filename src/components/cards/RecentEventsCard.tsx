const RecentEventsCard = () => {
  return (
    <div className="h-[67px] gap-4 flex justify-between items-center w-full">
      <img
        src="https://s3-alpha-sig.figma.com/img/fca1/b527/3dc913d6a517b22891c56fc7d0adbaf0?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b~OL50F~J9HsPHF-y~NV76Y5MBjWrWBXlfZV2BPSrDsIwsKn-dvV0bDCKn0gNnrobbd9OD1NaQRAGLBcUlJVpLVfxmXA8TJd8cbHdsze0jX8CsJOlCnIS6SSAdQabl9y9THTaaKgZ3-bqcZxtxEal~0xWXfR9Thy~Wx3tDQCK7BZ5ImUqCdaKcziAsZZN65QIDXmKh7PxIqtXMaLwOBN33FrDdWgSdjS6Ncb4nXMCLpFIgI8WPy8ufjutEgKZbfKTafOuKoF8J2oYpYx6xlCIFf0PlZBSFSh64CmRrwgLidjQKyohQ56DQMApc~Mn9womjp1RCT39-u3zZ1Wn~pcMQ__"
        alt=""
        className="w-[65px] h-[65px] rounded-md object-cover"
      />
      <div>
        <h2 className="font-DMSans text-[15px] font-semibold text-left">
          Find the Right Learning Path for your
        </h2>
        <p className="font-DMSans text-[14px] font-normal text-left">
          April 13, 2022
        </p>
      </div>
    </div>
  );
};

export default RecentEventsCard;
