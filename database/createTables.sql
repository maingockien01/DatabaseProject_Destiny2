BEGIN TRANSACTION;

CREATE TABLE TierType (
    ttID        INT             NOT NULL,
    TierName    varchar(64)     NOT NULL,
    PRIMARY KEY (ttID)
);

CREATE TABLE Mods (
    mID         INT             NOT NULL,
    ModName     varchar(64)     NOT NULL,
    PRIMARY KEY (mID)
);


CREATE TABLE Source (
    sID         INT             NOT NULL,
    Description TEXT,
    PRIMARY KEY (sID)
);

CREATE TABLE DamageType (
    dID         INT             NOT NULL,
    DamageName  varchar(64)     NOT NULL,
    PRIMARY KEY (dID)
);

CREATE TABLE Frame (
    fID         INT             NOT NULL,
    Description TEXT,
    PRIMARY KEY (fID)
);


CREATE TABLE AmmoType (
    amID        INT             NOT NULL,
    AmmoName    varchar(64)     NOT NULL,
    PRIMARY KEY (amID)
);

CREATE TABLE WeaponType (
    tID         INT             NOT NULL,
    WeaponName varchar(64)      NOT NULL,
    PRIMARY KEY (tID)
);

CREATE TABLE ArmorMod (
    aID int NOT NULL,
    ModName varchar(64)         NOT NULL,

    PRIMARY KEY (aID, ModName)
};

CREATE TABLE ArmorForm {
    aID         INT             NOT NULL,
    sID         INT             NOT NULL,
    PRIMARY KEY (aID, sID)
};

CREATE TABLE CanRoll {
    wID         INT             NOT NULL,
    pID         INT             NOT NULL,
    PRIMARY KEY (wID, pID)
};

CREATE TABLE CanMod {
    wID         INT             NOT NULL,
    mID         INT             NOT NULL,
    PRIMARY KEY (wID, mID)
};

CREATE TABLE WeaponFrom {
    wID         INT             NOT NULL,
    sID         INT             NOT NULL,
    PRIMARY KEY (wID, sID)
};

CREATE TABLE Catalysts {
    cID         INT             NOT NULL,
    Effect      TEXT,
    wID         INT,
    PRIMARY KEY (cID)
};

CREATE TABLE Armor {
    aID         INT             NOT NULL,
    Slot
    Description TEXT,
    Name        varchar(64)     NOT NULL,
    Mobility    INT,
    Resilience  INT,
    Recovery    INT,
    Discipline  INT,
    Intelliect  INT,
    Strength    INT,
    pID         INT,
    ttID        INT,
    PRIMARY KEY (aID),
};

CREATE TABLE Perks {
    pID         INT             NOT NULL,
    Description TEXT,
    ttID        TEXT,
    PRIMARY KEY (pID)
};

CREATE TABLE Weapons {
    wID         INT             NOT NULL,
    Name        varchar(64),
    Lore        TEXT,
    Impact      INT,
    Range       INT,
    Stability   INT,
    Handling    INT,
    ReloadSpeed INT,
    AimAssistance INT,
    InventorySize INT,
    Zoom        INT,
    RecoilDirection INT,
    BounceIntensity INT,
    tID         INT,
    amID        INT,
    fID         INT,
    dID         INT,
    ttID        INT,
    PRIMARY KEY (wID)
};
    
-- Add Constraints Foreign Key after table creation

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

ALTER TABLE Perks
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
