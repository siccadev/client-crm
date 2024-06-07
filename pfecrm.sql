-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:4306:4306
-- Generation Time: Jun 06, 2024 at 04:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pfecrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `demandes_fin`
--

CREATE TABLE `demandes_fin` (
  `IDDemandes_Fin` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `DF_Date` date DEFAULT NULL,
  `Cl_Type` tinyint(3) UNSIGNED DEFAULT 0,
  `Cl_RaiSoc` varchar(100) DEFAULT NULL,
  `Cl_Nom` varchar(50) DEFAULT NULL,
  `Cl_Prenom` varchar(50) DEFAULT NULL,
  `Cl_Sigle` varchar(30) DEFAULT NULL,
  `KTPM` char(2) DEFAULT NULL,
  `KFJUR` char(3) DEFAULT NULL,
  `KRGM` binary(4) DEFAULT NULL,
  `Cl_RC_UI` varchar(15) DEFAULT NULL,
  `Cl_Mat_Fisc` varchar(13) DEFAULT NULL,
  `Cl_Att_Agr` varchar(10) DEFAULT NULL,
  `Cl_Date_Creat` date DEFAULT NULL,
  `Cl_Capital` int(11) DEFAULT 0,
  `Cl_Adresse` varchar(70) DEFAULT NULL,
  `KLOC` char(4) DEFAULT NULL,
  `KTIDPM` char(2) DEFAULT NULL,
  `Cl_NumIdPM` varchar(15) DEFAULT NULL,
  `KNATS_S` binary(4) DEFAULT NULL,
  `GSCode` binary(4) DEFAULT NULL,
  `Cl_Fonct_Lien_Polit` varchar(50) DEFAULT NULL,
  `Cl_Patrimoine` varchar(50) DEFAULT NULL,
  `Cl_Val_Patrimoine` int(11) DEFAULT 0,
  `Cl_Regime_Matrimonial` tinyint(3) UNSIGNED DEFAULT 0,
  `Cl_BE_Nom_Prenom` varchar(50) DEFAULT NULL,
  `Cl_BE_KTIDPM` char(2) DEFAULT NULL,
  `Cl_BE_NumId` varchar(15) DEFAULT NULL,
  `Cl_BE_Adresse` varchar(100) DEFAULT NULL,
  `Cl_BE_KPAYS` char(3) DEFAULT NULL,
  `DF_Type_Projet` tinyint(3) UNSIGNED DEFAULT 0,
  `DF_Projet` varchar(50) DEFAULT NULL,
  `DF_Montant_HT` double DEFAULT 0,
  `DF_TVA` double DEFAULT 0,
  `DF_Montant_TTC` double DEFAULT 0,
  `DF_Auto_FinTTC` double DEFAULT 0,
  `DF_Durée` smallint(5) UNSIGNED DEFAULT 0,
  `Type_Taux` tinyint(3) UNSIGNED DEFAULT 0,
  `DF_Taux` double DEFAULT 0,
  `DF_TEG` double DEFAULT 0,
  `DF_Periode` binary(4) DEFAULT NULL,
  `IDSuccursales` bigint(20) DEFAULT 0,
  `DF_Provenance` varchar(30) DEFAULT NULL,
  `DF_Charge_Dossier` bigint(20) DEFAULT 0,
  `DF_RIB` varchar(20) DEFAULT NULL,
  `DF_Caution_NP` varchar(50) DEFAULT NULL,
  `DF_Caution_CIN` varchar(8) DEFAULT NULL,
  `DF_Hyp_NP` varchar(50) DEFAULT NULL,
  `DF_Hyp_CIN` varchar(8) DEFAULT NULL,
  `DF_Hyp_Objet` varchar(50) DEFAULT NULL,
  `DF_Hyp_Val` int(11) DEFAULT 0,
  `status` varchar(100) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 1,
  `approvalStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `demandes_fin`
--

INSERT INTO `demandes_fin` (`IDDemandes_Fin`, `UserID`, `DF_Date`, `Cl_Type`, `Cl_RaiSoc`, `Cl_Nom`, `Cl_Prenom`, `Cl_Sigle`, `KTPM`, `KFJUR`, `KRGM`, `Cl_RC_UI`, `Cl_Mat_Fisc`, `Cl_Att_Agr`, `Cl_Date_Creat`, `Cl_Capital`, `Cl_Adresse`, `KLOC`, `KTIDPM`, `Cl_NumIdPM`, `KNATS_S`, `GSCode`, `Cl_Fonct_Lien_Polit`, `Cl_Patrimoine`, `Cl_Val_Patrimoine`, `Cl_Regime_Matrimonial`, `Cl_BE_Nom_Prenom`, `Cl_BE_KTIDPM`, `Cl_BE_NumId`, `Cl_BE_Adresse`, `Cl_BE_KPAYS`, `DF_Type_Projet`, `DF_Projet`, `DF_Montant_HT`, `DF_TVA`, `DF_Montant_TTC`, `DF_Auto_FinTTC`, `DF_Durée`, `Type_Taux`, `DF_Taux`, `DF_TEG`, `DF_Periode`, `IDSuccursales`, `DF_Provenance`, `DF_Charge_Dossier`, `DF_RIB`, `DF_Caution_NP`, `DF_Caution_CIN`, `DF_Hyp_NP`, `DF_Hyp_CIN`, `DF_Hyp_Objet`, `DF_Hyp_Val`, `status`, `state`, `approvalStatus`) VALUES
(7, 0, '0000-00-00', 0, '\'Leasing Solutions Finances\'', '\'\'', '\'\'', '\'Leas\'', '\'m', '\'So', 0x2772c3a9, '\'1234567/A/M/00', '\'123 456 789 ', NULL, '0000-00-00', 0, '\'27 Avenue Maritime, 44300 Nantes\'', '\'440', '\'N', '\'1234567/A/M/00', 0x274c6561, 0x2747726f, '\'\'', '\'véhicules, équipements\'', 0, 0, '\'Jean Dupont\'', '\'1', '\'1234567890123\'', '\'12 rue des Tilleuls, 75011 Paris, France\'', '\'Fr', 0, '\'Importation et vente de voitures neuves de marque', 0, 0, 0, 0, 0, 0, 0, 0, 0x276d656e, 0, '\'Agence commerciale\'', 0, '\'FR76 1234 5678 9012', '\'Jeanne DUPONT\'', '\'1234567', '\'Pierre DURAND\'', '\'9876543', '\'Bien immobilier situé au 12 rue des Roses, 75018 ', 0, '', 0, NULL),
(8, 0, '0000-00-00', 0, '\'\'', '\'\'', '\'\'', '\'bta\'', '\'m', '\'So', 0x2772c3a9, '\'1234567/A/M/00', '\'123 456 789 ', NULL, '0000-00-00', 0, '\'27 Avenue Maritime, 44300 Nantes\'', '\'440', '\'N', '\'1234567/A/M/00', 0x276c6561, 0x276c6561, '\'\'', '\'\'', 0, 0, '\'nour\'', '\'\'', '\'\'', '\'\'', '\'\'', 0, '\'b\'', 0, 0, 0, 0, 0, 0, 0, 0, 0x276d656e, 0, '\'Agence commerciale\'', 0, '\'FR76 1234 5678 9012', '\'Jeanne DUPONT\'', '\'1234567', '\'Pierre DURAND\'', '\'\'', '\'Bien immobilier situé au 12 rue des Roses, 75018 ', 0, '', 2, NULL),
(9, 0, '0000-00-00', 0, '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', 0x27270000, '\'\'', '\'\'', NULL, '0000-00-00', 0, '\'\'', '\'\'', '\'\'', '\'\'', 0x27270000, 0x27270000, '\'\'', '\'\'', 0, 0, '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', 0, '\'\'', 0, 0, 0, 0, 0, 0, 0, 0, 0x27270000, 0, '\'\'', 0, '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', 0, '\'\'', 2, NULL),
(10, 0, '0000-00-00', 0, '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', 0x27270000, '\'\'', '\'\'', NULL, '0000-00-00', 0, '\'\'', '\'\'', '\'\'', '\'\'', 0x27270000, 0x27270000, '\'\'', '\'\'', 0, 0, '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', 0, '\'\'', 0, 0, 0, 0, 0, 0, 0, 0, 0x27270000, 0, '\'\'', 0, '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', 0, '', 0, NULL),
(11, 0, '0000-00-00', 0, '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', 0x27270000, '\'\'', '\'\'', NULL, '0000-00-00', 0, '\'\'', '\'\'', '\'\'', '\'\'', 0x27270000, 0x27270000, '\'\'', '\'\'', 0, 0, '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', 0, '\'\'', 0, 0, 0, 0, 0, 0, 0, 0, 0x27270000, 0, '\'\'', 0, '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', 0, '\'\'', 0, NULL),
(12, 0, '0000-00-00', 0, '', '', '', '', '', '', 0x00000000, '', '', NULL, '0000-00-00', 0, '', '', '', '', 0x00000000, 0x00000000, '', '', 0, 0, '', '', '', '', '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0x00000000, 0, '', 0, '', '', '', '', '', '', 0, '', 1, NULL),
(40, 0, '0000-00-00', 0, '', '', '', '', '', '', 0x00000000, '', '', NULL, '0000-00-00', 0, '', '', '', '', 0x00000000, 0x00000000, '', '', 0, 0, '', '', '', '', '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0x69796573, 0, '', 0, '', '', '', '', '', '', 0, '', 2, NULL),
(41, 0, '0000-00-00', 0, '', '', '', '', '', '', 0x00000000, '', '', NULL, '0000-00-00', 0, '', '', '', '', 0x00000000, 0x00000000, '', '', 0, 0, '', '', '', '', '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0x00000000, 0, '', 0, '', '', '', '', '', '', 0, '', 2, NULL),
(42, 0, '0000-00-00', 0, '', '', '', '', '', '', 0x00000000, '', '', NULL, '0000-00-00', 0, '', '', '', '', 0x00000000, 0x00000000, '', '', 0, 0, '', '', '', '', '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0x00000000, 0, '', 0, '', '', '', '', '', '', 0, '', 0, NULL),
(73, 0, '0000-00-00', 0, '', '', '', '', '', '', 0x00000000, '', '', NULL, '0000-00-00', 0, '', '', '', '', 0x00000000, 0x00000000, '', '', 0, 0, '', '', '', '', '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0x00000000, 0, '', 0, '', '', '', '', '', '', 0, '', 1, 'not approved'),
(74, 0, '0000-00-00', 0, '', '', '', '', '', '', 0x00000000, '', '', NULL, '0000-00-00', 0, '', '', '', '', 0x00000000, 0x00000000, '', '', 0, 0, '', '', '', '', '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0x00000000, 0, '', 0, '', '', '', '', '', '', 0, '', 1, 'not approved'),
(75, 0, '0000-00-00', 0, '9+74', '', '', '', '', '', 0x00000000, '', '', NULL, '0000-00-00', 0, '', '', '', '', 0x00000000, 0x00000000, '', '', 0, 0, '', '', '', '', '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0x00000000, 0, '', 0, '', '', '', '', '', '', 0, '', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `activite` varchar(100) NOT NULL,
  `secteur` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`username`, `email`, `password`, `role`, `token`, `id`, `activite`, `secteur`) VALUES
('nour_hannachi', 'nourhannechi7@gmail.com', 'FAMILLEhannachi1234*', 'client', '4f65e9e42a28f591a151999dd9509685f65446fd', 7, '', ''),
('nourhannachi0319', 'nounouhannachi2001@gmail.com', 'nour1234*', 'client', '37f63f07c4544b1c4affbb5d4c21e505f2303c80', 10, '', ''),
('adminsmartsystem', 'admin@smartsystem.com', 'adminadmin', 'admin', NULL, 17, '', ''),
('amine_hannachi', 'nounouhannachi2001@gmail.com', 'nour1234*', 'user', NULL, 20, '', ''),
('amine_hannachi', 'nounouhannachi2001@gmail.com', 'nour1234*', 'user', NULL, 21, '', ''),
('nour_hannachi19', 'nourhannechi7@gmail.com', 'FAMILLEhannachi1234*', 'user', NULL, 22, '', ''),
('nour_hannachi19', 'nourhannechi7@gmail.com', 'FAMILLEhannachi1234*', 'user', NULL, 23, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `state_types`
--

CREATE TABLE `state_types` (
  `state_id` tinyint(1) NOT NULL,
  `state_description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `state_types`
--

INSERT INTO `state_types` (`state_id`, `state_description`) VALUES
(0, 'not approved'),
(1, 'processing'),
(2, 'approved');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `demandes_fin`
--
ALTER TABLE `demandes_fin`
  ADD PRIMARY KEY (`IDDemandes_Fin`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `state_types`
--
ALTER TABLE `state_types`
  ADD PRIMARY KEY (`state_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `demandes_fin`
--
ALTER TABLE `demandes_fin`
  MODIFY `IDDemandes_Fin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
