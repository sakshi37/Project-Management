drop Procedure GetLocationById_

go 

Create Procedure GetLocationById_

@LocationId int

As 
Begin
	select
		
		L.LocationId,
		L.LocationName,
		L.LocationStatus,
		C.CityId,
        C.CityName,
        
        C.Action,
        S.StateId,
        S.StateName,
        CO.CountryId,
        CO.CountryName

		from Location_ L
	inner join Rahul.City_ c on L.CityId = C.CityId
	INNER JOIN Rahul.State_ S ON L.StateId = S.StateId
    INNER JOIN Country_ CO ON L.CountryId = CO.CountryId
    WHERE L.LocationId = @LocationId ANd L.LocationStatus =1;

End