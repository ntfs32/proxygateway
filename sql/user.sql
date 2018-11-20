CREATE TABLE `agw_service` (
  `id` int(11) NOT NULL,
  `username` int(11) NOT NULL,
  `password` varchar(64) NOT NULL,
  `host` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;