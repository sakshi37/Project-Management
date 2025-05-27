CREATE FUNCTION [dbo].[fn_SplitString]
(
    @String NVARCHAR(MAX),
    @Delimiter CHAR(1)
)
RETURNS @Result TABLE (Value NVARCHAR(MAX))
AS
BEGIN
    DECLARE @Start INT = 1, @End INT

    WHILE CHARINDEX(@Delimiter, @String, @Start) > 0
    BEGIN
        SET @End = CHARINDEX(@Delimiter, @String, @Start)
        INSERT INTO @Result (Value)
        VALUES (LTRIM(RTRIM(SUBSTRING(@String, @Start, @End - @Start))))
        SET @Start = @End + 1
    END

    -- Insert the last value
    IF @Start <= LEN(@String)
    BEGIN
        INSERT INTO @Result (Value)
        VALUES (LTRIM(RTRIM(SUBSTRING(@String, @Start, LEN(@String)))))
    END

    RETURN
END;
	