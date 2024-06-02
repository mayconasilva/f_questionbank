export  interface TestBoardResponse{
    testBoardId: number;
    testBoardName: string;
    testBoardAcronym: string;
    createdDate: Date;
    lastModifiedDate: Date;
}

export  interface TestBoardRequest{
    testBoardName: string;
    testBoardAcronym: string;
}