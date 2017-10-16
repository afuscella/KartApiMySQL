# Kart-API-MySQL

1. [Find out MySQL Database](#mysql-databases)
2. [Find out MySQL Tables](#mysql-tables)
3. [Find out MySQL Views](#mysql-views)

## MySQL Databases

```
DROP DATABASE IF EXISTS kart;
CREATE DATABASE kart 
	CHARSET = utf8 
	COLLATE = utf8_general_ci;
```

### Entity relation

![Screenshot](https://github.com/afuscella/KartApiMySQL/blob/master/img/entity%20relational%20diagram.png)

### MySQL tables

Database relationship

```
USE kart;
```

*Season*
```
CREATE TABLE Season (
	id_season 		INT NOT NULL,
	INDEX idx_id(id_season),
	PRIMARY KEY (id_season) )
	ENGINE = MyISAM
	DEFAULT CHARSET = utf8;
```

*Round*
```
CREATE TABLE Round (
	id_round 		INT NOT NULL auto_increment,
	id_season 		INT NOT NULL,
	racename		VARCHAR(255) default NULL,
	date 			DATE,
	time 			TIME,
	circuit 		VARCHAR(255),
	locality 		VARCHAR(255),
	PRIMARY KEY (id_round, id_season),
	INDEX idx_id(id_round),
	INDEX idx_season(id_round, id_season),
	CONSTRAINT fk_round_season FOREIGN KEY (id_season)
	REFERENCES Season(id_season)
	ON DELETE CASCADE
	ON UPDATE CASCADE )
	ENGINE = MyISAM
	DEFAULT CHARSET = utf8;
```

*Result*
```
CREATE TABLE Result (
	id_season 		INT NOT NULL,
	id_round 		INT NOT NULL,
	id_driver		INT NOT NULL,
	laps			INT NOT NULL DEFAULT 0,
	grid 			INT NOT NULL DEFAULT 0,
	position		INT NOT NULL DEFAULT 0,
	time 			VARCHAR(255) default NULL,
	status 			VARCHAR(255) default NULL,
	points 			INT NOT NULL,
	PRIMARY KEY (id_season, id_round, id_driver),
	INDEX idx_season(id_season),
	INDEX idx_round(id_season, id_round),
	INDEX idx_driver(id_season, id_round, id_driver),
	INDEX idx_points(id_season, points),
	CONSTRAINT fk_result_round FOREIGN KEY (id_season, id_round)
	REFERENCES Round(id_season, id_round),
	CONSTRAINT fk_result_driver FOREIGN KEY (id_driver, id_season)
	REFERENCES Driver(id_driver, id_season)
	ON DELETE CASCADE
	ON UPDATE CASCADE )
	ENGINE = MyISAM
	DEFAULT CHARSET = utf8;
```

*Team*
```
CREATE TABLE Team (
	id_team   		INT NOT NULL auto_increment,
	id_season 		INT NOT NULL,
	team_name		VARCHAR(255) default NULL,
	PRIMARY KEY (id_season, id_team),
	INDEX idx_id(id_team),
	INDEX idx_season(id_team, id_season),
	CONSTRAINT fk_team_season FOREIGN KEY (id_season)
	REFERENCES Season(id_season)
	ON DELETE CASCADE
	ON UPDATE CASCADE )
	ENGINE = MyISAM
	DEFAULT CHARSET = utf8;
```

*Driver*
```
CREATE TABLE Driver (
	id_driver   	INT NOT NULL auto_increment,
	id_season 		INT NOT NULL,
	id_team     	INT NOT NULL,
	driver_name		VARCHAR(255) default NULL,
	birth_place 	VARCHAR(255) default NULL,
	birth_date    	DATE,
	twitter			VARCHAR(255) default NULL,
	facebook 		VARCHAR(255) default NULL,
	PRIMARY KEY (id_driver, id_season, id_team),
	INDEX idx_id(id_driver),
	INDEX idx_season_id(id_driver, id_season),
	CONSTRAINT fk_driver_team FOREIGN KEY (id_team, id_season)
	REFERENCES Team(id_team, id_season) )
	ENGINE = MyISAM
	DEFAULT CHARSET = utf8;
```

### MySQL Views

*GetSeasons*
```
CREATE VIEW GetSeasons AS
SELECT	s.id_season	AS id_season
	FROM Season s
	ORDER BY id_season DESC;
```

*GetRounds*
```
CREATE VIEW GetRounds AS
SELECT	s.id_season	AS id_season,
	r.id_round	AS id_round,
	r.racename	AS racename,
	DATE_FORMAT(r.date, '%Y-%m-%d') AS date,
	r.time		AS time,
	r.circuit	AS circuit,
	r.locality	AS locality
	FROM Season s JOIN Round r
	ON s.id_season = r.id_season
	ORDER BY id_season, 
		 id_round ASC;
```

*GetStandings*
```
CREATE VIEW GetStandings AS
SELECT	s.id_season	AS id_season,
	d.id_driver	AS id_driver,
	d.driver_name	AS driver_name,
	e.id_team	AS id_team,
	e.team_name	AS team_nam,
	SUM(CASE WHEN t.points > 0 THEN points ELSE 0 END) AS points 
	FROM Season s 
	INNER JOIN Driver d 
		ON ( s.id_season = d.id_season )
	INNER JOIN Team	e 
		ON ( s.id_season = e.id_season AND d.id_team = e.id_team ) 
	LEFT OUTER JOIN Result t 
		ON ( s.id_season = t.id_season AND d.id_driver = t.id_driver ) 
	GROUP BY d.id_driver
	ORDER BY id_season,
		 points DESC,
		 id_driver;
```

*GetTeams*
```
CREATE VIEW GetTeams AS
SELECT	s.id_season	AS id_season,
	t.id_team	AS id_team,
	t.team_name	AS team_name
	FROM Season s JOIN Team t
		ON ( s.id_season = t.id_season )
	ORDER BY id_season, 
		 id_team ASC;
```

*GetDrivers*
```
CREATE VIEW GetDrivers AS
SELECT	t.id_season	AS id_season,
	d.id_driver	AS id_driver,
	d.driver_name	AS driver_name,
	t.id_team	AS id_team,
	t.team_name	AS team_name,
	DATE_FORMAT(d.birth_date, '%Y-%m-%d') AS birth_date,
	d.birth_place	AS birth_place,
	d.twitter	AS twitter,
	d.facebook	AS facebook
	FROM Driver d 
	INNER JOIN Team t ON ( d.id_team = t.id_team )
	ORDER BY id_driver ASC;
```