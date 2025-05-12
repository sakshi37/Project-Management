CREATE PROCEDURE [dbo].[SP_GetAllShifts]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT ShiftId, ShiftType
    FROM dbo.Tbl_ShiftMaster;

END;

drop procedure SP_GetAllShifts

exec SP_GetAllShifts