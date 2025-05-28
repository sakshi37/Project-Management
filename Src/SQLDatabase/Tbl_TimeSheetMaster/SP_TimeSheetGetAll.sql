USE [HR_Module]
GO

/****** Object:  StoredProcedure [dbo].[SP_TimeSheetGetAll]    Script Date: 5/28/2025 7:13:03 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE  PROCEDURE [dbo].[SP_TimeSheetGetAll]
AS
BEGIN
    SELECT 
        FK_ProjectId as ProjectId ,
		Sequence ,
		Part ,
		Activity ,
		Type ,
		StartTime,
		EndTime ,
		Hrs ,
		Min ,
		Fk_EmpId as EmpId ,
		TimeSheetStatus ,
		EM.Code
    FROM dbo.Tbl_TimeSheetMaster TM
	join dbo.Tbl_Employee_master EM on TM.Fk_EmpId = EM.Id

END
GO


 