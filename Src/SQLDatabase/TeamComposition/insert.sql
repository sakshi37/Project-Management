USE [HR_Module]
GO

/****** Object:  StoredProcedure [dbo].[SP_TeamCompositionInsert]    Script Date: 5/20/2025 4:49:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[SP_TeamCompositionInsert]
    @TeamName NVARCHAR(100),
    @Fk_BranchId INT,
    @Fk_DivisionId INT,
    @Fk_TeamLeaderId INT,
    @CreatedBy INT
AS
BEGIN
    INSERT INTO Tbl_TeamComposition (TeamName, Fk_BranchId, Fk_DivisionId, Fk_TeamLeaderId, TeamStatus, CreatedBy, CreatedDate)
    VALUES (@TeamName, @Fk_BranchId, @Fk_DivisionId, @Fk_TeamLeaderId, 1, @CreatedBy, GETDATE());
END;

GO


