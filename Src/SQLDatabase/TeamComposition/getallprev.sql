USE [HR_Module]
GO

/****** Object:  StoredProcedure [dbo].[SP_TeamCompositionGetAll]    Script Date: 5/21/2025 1:14:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[SP_TeamCompositionGetAll]
    @BranchId INT = NULL,
    @DivisionId INT = NULL
AS
BEGIN
    SELECT 
        T.TeamId,
        T.TeamName,
        T.TeamStatus,
		B.BranchId As Fk_BranchId,
        B.BranchName,
		D.DivisionId As Fk_DivisionId,
        D.DivisionName,
		T.Fk_TeamLeaderId,
        E.Name AS TeamLeaderName
    FROM Tbl_TeamComposition T
    INNER JOIN Tbl_BranchMaster B ON T.Fk_BranchId = B.BranchId
    INNER JOIN Tbl_DivisionMaster D ON T.Fk_DivisionId = D.DivisionId
    INNER JOIN Tbl_Employee_master E ON T.Fk_TeamLeaderId = E.Id
    WHERE (@BranchId IS NULL OR T.Fk_BranchId = @BranchId)
      AND (@DivisionId IS NULL OR T.Fk_DivisionId = @DivisionId);
END
GO


