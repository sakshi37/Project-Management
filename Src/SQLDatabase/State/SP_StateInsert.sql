USE [HrModule]
GO

/****** Object:  StoredProcedure [dbo].[SP_StateInsert]    Script Date: 5/7/2025 5:05:58 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE or alter PROCEDURE [dbo].[SP_StateInsert]
    @Fk_CountryId INT,
    @StateName NVARCHAR(100),
    @StateCode CHAR(3),
    @CreatedBy INT
AS
BEGIN
-- Check if the city already exists in the same state (case-insensitive)
    IF EXISTS (
        SELECT 1 
        FROM Tbl_StateMaster 
        WHERE StateName COLLATE SQL_Latin1_General_CP1_CI_AS = @StateName COLLATE SQL_Latin1_General_CP1_CI_AS
        AND Fk_CountryId = @Fk_CountryId
    )
    BEGIN
        -- Return a message indicating the city already exists
        SELECT 'State already exists in this Country' AS Message;
        RETURN;
    END

    INSERT INTO Tbl_StateMaster (
        Fk_CountryId, StateName, StateCode, StateStatus, 
        CreatedBy, CreatedDate
    )
    VALUES (
        @Fk_CountryId, @StateName, @StateCode, 1,
        @CreatedBy, GETDATE()
    );

    SELECT 'State Added Successfully' AS Message;
END;
GO


