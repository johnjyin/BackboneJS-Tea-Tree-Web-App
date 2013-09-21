/*
SQLyog Community v8.54 
MySQL - 5.5.27 : Database - ebiz-ct
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ebiz-ct` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `ebiz-ct`;

/*Table structure for table `ct_tbl_tea` */

DROP TABLE IF EXISTS `ct_tbl_tea`;

CREATE TABLE `ct_tbl_tea` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `brand` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `serving` varchar(50) NOT NULL,
  `servings` int(3) DEFAULT '0',
  `ingredients` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `picture` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `ct_tbl_tea` */

insert  into `ct_tbl_tea`(`id`,`brand`,`name`,`serving`,`servings`,`ingredients`,`description`,`picture`) values (1,'DILMAH','Dilmah Jasmine Green Teakkkk','1.5g',50,'Green tea, Jasmine','A mild green tea with the traditional, natural Jasmine flavour. The perfume of Jasmine is added using petals of Jasmine, a process several thousand years old. Uplifting and aromatic. ','dilmah-jasmin-tea.png'),(2,'LIPTON','Lipton Cranberry Green Tea','2.0g',20,'Green tea, hibiscus flowers, chamomile flowers, cinnamon, citric acid (provides tartness), licorice root, lemon peel, roasted chicory root, natural flavor, soy lecithin.','The tart-sweet tastes of cranberries and pomegranate combine for a bright, great-tasting cup of Lipton Tea. Made with green tea that provides flavonoids, it\'s a great way to wake up your taste buds.','greentea-cranberry.png'),(3,'LIPTON','Lipton Lemon Ginseng Green Tea','1.7g',30,'Green tea, panax ginseng, natural flavor, lemon grass, soy lecithin.','Lipton has combined the tangy tastes of lemon and ginseng with our pure green tea to create an exciting refreshment with a clean, uplifting taste and tea flavonoids.','greentea-lemonginseng.png'),(4,'TWINING','Twining Lemon Green Tea','2.5g',20,'Green tea, Lemon','The zesty flavour of lemon balances the taste of the green tea, making this cheerful and delicious blend a joy to drink. Breathe in the aroma, sip and enjoy the beautiful flavours  ','Twinings-green-tea-lemon.png'),(5,'Twinings','English Breakfast','20',10,'','Twinings Tea Cup Bags offer you the sophistication of its classic tea blends in a convenient format Perfect anytime Anywhere and ideal for the office.\n			\n			\n			\n			\n			\n			\n			\n			\n			\n			\n			','twinings-english.png'),(6,'Twinings','Earl Grey','20g',10,'Black tea, Light flavour','Twinings Tea Cup Bags Earl Grey Enveloped Packet of 10 Twinings Tea Cup Bags offer you the sophistication of its classic tea blends in a convenient format Perfect anytime Anywhere and ideal for the office.\n			\n			\n			\n			','twinings-earl-grey.png'),(7,'Twinings','Lady Grey','20g',10,'Light black tea, organges, lemons','Twinings Tea Bags Lady Grey Enveloped Pack of 10 Twinings Tea Cup Bags offer you the sophistication of its classic tea blends in a convenient format Perfect anytime, Anywhere and ideal for the office.','twinings-lady-grey.png'),(8,'Twinings','Lemon Twist','15g',10,'','Twinings Tea Bags Lemon Twist Pack of 10 Twinings Tea Cup Bags offer you the sophistication of its classic tea blends in a convenient format Perfect anytime, Anywhere and ideal for the office.','twinings-lemon-twist.png'),(14,'Nerada','Earl Grey','20g',50,'Nerada Earl Grey is a quality Australian Grown Pesticide Free black tea flavoured with bergamot providing that unique Earl Grey taste and aroma.','This popular tea was named after Charles Grey, the second Earl in his line, who was Prime Minister to King William IV in 1830. The recipe was said to have been given to the Earl by a Chinese governor who was a close friend . Earl Grey gets its delicate flavour from the oil of bergamot, a small citrus fruit.\n			\n			','nerada-earl-grey.png'),(15,'Nerada','Organics','22g',50,'No pesticides, fungicides or artificial chemical fertilisers have been used during its cultivation.','A quality organic black tea that has a full bodied flavour for those who enjoy a stronger cup of tea.\nNerada Organic Extra Strong Black tea is specially selected for its quality and is grown using only natureâ€™s natural resources','nerada-organics.png');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
