USE [HrModule]
GO

/****** Object:  StoredProcedure [dbo].[SP_CountryInsert]    Script Date: 5/9/2025 12:48:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE or alter PROCEDURE [dbo].[SP_CountryInsert]
    @CountryName NVARCHAR(100),
    @CountryCode char(3),
    @CreatedBy int
AS
BEGIN
    SET NOCOUNT ON;
	IF EXISTS (
        SELECT 1 
        FROM Tbl_CountryMaster 
        WHERE CountryName COLLATE SQL_Latin1_General_CP1_CI_AS = @CountryName
    )
    BEGIN
        -- Return a message indicating the city already exists
        SELECT 'Country already exists' AS Message;
        RETURN;
    END

    INSERT INTO Tbl_CountryMaster (CountryName, CountryCode, CountryStatus, CreatedBy, CreatedDate)
    VALUES (@CountryName, @CountryCode, 1, @CreatedBy, GETDATE());

END
GO


