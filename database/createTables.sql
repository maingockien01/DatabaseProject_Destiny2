BEGIN TRANSACTION;

CREATE TABLE TierType (
    ttID        BIGINT             NOT NULL,
    TierName    varchar(64)     NOT NULL,
    PRIMARY KEY (ttID)
);

CREATE TABLE Mods (
    mID         BIGINT             NOT NULL,
    ModName     varchar(64)     NOT NULL,
    PRIMARY KEY (mID)
);


CREATE TABLE Source (
    sID         BIGINT             NOT NULL,
    Description TEXT,
    PRIMARY KEY (sID)
);

CREATE TABLE DamageType (
    dID         BIGINT             NOT NULL,
    DamageName  varchar(64)     NOT NULL,
    PRIMARY KEY (dID)
);

CREATE TABLE Frame (
    fID         BIGINT             NOT NULL,
    Description VARCHAR,
    PRIMARY KEY (fID)
);


CREATE TABLE AmmoType (
    amID        BIGINT             NOT NULL,
    AmmoName    varchar(64)        NOT NULL,
    PRIMARY KEY (amID)
);

CREATE TABLE WeaponType (
    tID         BIGINT             NOT NULL,
    WeaponName varchar(64)   	   NOT NULL,
    PRIMARY KEY (tID)
);

CREATE TABLE ArmorMod (
    aID 	BIGINT 				   NOT NULL,
    mID 	BIGINT			       NOT NULL,
    PRIMARY KEY (aID, mID)
);

CREATE TABLE ArmorForm (
    aID         BIGINT             NOT NULL,
    sID         BIGINT             NOT NULL,
    PRIMARY KEY (aID, sID)
);

CREATE TABLE CanRoll (
    wID         BIGINT             NOT NULL,
    pID         BIGINT             NOT NULL,
    PRIMARY KEY (wID, pID)
);

CREATE TABLE CanMod (
    wID         BIGINT             NOT NULL,
    mID         BIGINT             NOT NULL,
    PRIMARY KEY (wID, mID)
);

CREATE TABLE WeaponFrom (
    wID         BIGINT             NOT NULL,
    sID         BIGINT             NOT NULL,
    PRIMARY KEY (wID, sID)
);

CREATE TABLE Catalysts (
    cID         BIGINT             NOT NULL,
    Effect      TEXT,
    wID         BIGINT,
    PRIMARY KEY (cID)
);

CREATE TABLE Armor (
    aID         BIGINT             NOT NULL,
    Slot		TEXT,
    Description TEXT,
    Name        varchar(64)     NOT NULL,
    Mobility    BIGINT,
    Resilience  BIGINT,
    Recovery    BIGINT,
    Discipline  BIGINT,
    Intelliect  BIGINT,
    Strength    BIGINT,
    pID         BIGINT,
    ttID        BIGINT,
    PRIMARY KEY (aID)
);


CREATE TABLE Perks (
    Name        TEXT,
    pID         BIGINT             NOT NULL,
    Description TEXT,
    PRIMARY KEY (pID)
);

CREATE TABLE Weapons (
    wID         BIGINT             NOT NULL,
    Name        varchar(64),
    Lore        TEXT,
    Impact      BIGINT,
    Range       BIGINT,
    Stability   BIGINT,
    Handling    BIGINT,
    ReloadSpeed BIGINT,
    AimAssistance BIGINT,
    InventorySize BIGINT,
    Zoom        BIGINT,
    RecoilDirection BIGINT,
    tID         BIGINT,
    amID        BIGINT,
    fID         BIGINT,
    dID         BIGINT,
    ttID        BIGINT,
    PRIMARY KEY (wID)
);

ALTER TABLE Weapons
ADD CONSTRAINT fk_tid
FOREIGN KEY (tID)
    REFERENCES WeaponType (tID);
	
ALTER TABLE Weapons
ADD CONSTRAINT fk_amid
FOREIGN KEY (amID)
    REFERENCES AmmoType (amID);

ALTER TABLE Weapons
ADD CONSTRAINT fk_fid
FOREIGN KEY (fID)
    REFERENCES Frame (fID);

ALTER TABLE Weapons
ADD CONSTRAINT fk_did
FOREIGN KEY (dID)
    REFERENCES DamageType (dID);

ALTER TABLE  Weapons
ADD CONSTRAINT fk_ttid
FOREIGN KEY (ttID)
    REFERENCES TierType (ttID);

ALTER TABLE Armor
ADD CONSTRAINT fk_pid
FOREIGN KEY (pID)
    REFERENCES Perks (pID);

ALTER TABLE Armor
ADD CONSTRAINT fk_ttid
FOREIGN KEY (ttID)
    REFERENCES TierType (ttID);

ALTER TABLE Catalysts
ADD CONSTRAINT fk_wid
FOREIGN KEY (wID)
    REFERENCES Weapons (wID);

ALTER TABLE WeaponFrom
ADD CONSTRAINT fk_wid
FOREIGN KEY (wID)
    REFERENCES Weapons (wID);

ALTER TABLE  WeaponFrom
ADD CONSTRAINT fk_sid
FOREIGN KEY (sID)
    REFERENCES Source (sID);

ALTER TABLE CanMod
ADD CONSTRAINT fk_wid
FOREIGN KEY (wID)
    REFERENCES Weapons (wID);

ALTER TABLE CanMod
ADD CONSTRAINT fk_mid
FOREIGN KEY (mID)
    REFERENCES Mods (mID);

ALTER TABLE CanRoll
ADD CONSTRAINT fk_wid
FOREIGN KEY (wID)
    REFERENCES Weapons (wID);

ALTER TABLE CanRoll
ADD CONSTRAINT fk_pid
FOREIGN KEY (pID)
    REFERENCES Perks (pID);

ALTER TABLE ArmorForm
ADD CONSTRAINT fk_aid
FOREIGN KEY (aID)
    REFERENCES Armor (aID);

ALTER TABLE ArmorForm
ADD CONSTRAINT fk_sid
FOREIGN KEY (sID)
    REFERENCES Source (sID);

ALTER TABLE ArmorMod
ADD CONSTRAINT fk_aid
FOREIGN KEY (aID)
    REFERENCES Armor (aID);

ALTER TABLE ArmorMod
ADD CONSTRAINT fk_mid
FOREIGN KEY (mID)
    REFERENCES Mods (mID);
	
END TRANSACTION;