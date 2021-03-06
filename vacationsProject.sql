use we0wa6t45r5wzpsj;
CREATE TABLE following (
  idfollowing int(11) NOT NULL AUTO_INCREMENT,
  userID int(11) DEFAULT NULL,
  vacationID int(11) DEFAULT NULL,
  PRIMARY KEY (idfollowing)
) ;

CREATE TABLE users (
  userID int(11) NOT NULL AUTO_INCREMENT,
  Email varchar(2000) DEFAULT NULL,
  userName varchar(1000) DEFAULT NULL,
  lastName varchar(10000) DEFAULT NULL,
  password varchar(100) DEFAULT NULL,
  isAdmin tinyint(4) DEFAULT NULL,
  PRIMARY KEY (userID)
) ;

CREATE TABLE vacations (
  vacationID int(11) NOT NULL AUTO_INCREMENT,
  Descripe varchar(1000) DEFAULT NULL,
  startDate date DEFAULT NULL,
  Price int(11) DEFAULT NULL,
  Img varchar(10000) DEFAULT NULL,
  followers int(11) DEFAULT NULL,
  endDate date DEFAULT NULL,
  PRIMARY KEY (vacationID)
) ;

INSERT INTO vacations ( Descripe, startDate, Price,Img,followers,endDate )
VALUES ('thailand','2020-05-09','145','https://www.hootholidays.com.au/media/catalog/category/Thailand-Banner.jpg','0','2020-06-19');
INSERT INTO vacations ( Descripe, startDate, Price,Img,followers,endDate )
VALUES ('singapore','2020-05-09','145','https://image.cnbcfm.com/api/v1/image/105066394-GettyImages-498350103_1.jpg?v=1532563669&w=1400&h=950','0','2020-06-19'
);
INSERT INTO vacations ( Descripe, startDate, Price,Img,followers,endDate )
VALUES ('greece','2019-09-08','234','https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Shipwreck_Beach_-_Western_coast_of_Zakynthos%2C_Greece_%2812%29.jpg/220px-Shipwreck_Beach_-_Western_coast_of_Zakynthos%2C_Greece_%2812%29.jpg','0','2020-06-19'
);
INSERT INTO vacations ( Descripe, startDate, Price,Img,followers,endDate )
VALUES ('switzerland','2019-09-08','234','https://ssl.tzoo-img.com/images/tzoo.24069.0.793912.Lauterbrunnen-switzerland.jpg?width=412&spr=3','0','2020-01-19'
);
INSERT INTO vacations ( Descripe, startDate, Price,Img,followers,endDate )
VALUES ('philiphines','2020-09-08','999','https://dsvsbigncb06y.cloudfront.net/site/diving/philippines/liveaboard-philippines-coron-palawan-xxl.jpg','0','2021-06-19'
);
INSERT INTO vacations ( Descripe, startDate, Price,Img,followers,endDate )
VALUES ('japan','2019-09-08','234','https://d36tnp772eyphs.cloudfront.net/blogs/1/2011/05/japan-1200x729.jpg','0','2020-06-19'
);
