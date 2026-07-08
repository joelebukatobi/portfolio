CREATE TABLE `projects` (
	`id` varchar(36) NOT NULL,
	`name` varchar(150) NOT NULL,
	`description` text NOT NULL,
	`technologies` varchar(500) NOT NULL,
	`website` varchar(500),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
