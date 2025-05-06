Create procedure SP_ShiftInsert

 @ShiftType varchar(20)

 As 
 Begin
	SET NOCOUNT ON;
	 insert into Tbl_ShiftMaster (ShiftType)
	 values(@ShiftType);

 End