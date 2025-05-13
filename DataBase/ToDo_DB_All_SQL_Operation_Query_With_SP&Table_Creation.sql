use TD_SampleDB

CREATE TABLE MASTERUSER (
    USERID int IDENTITY(1,1) PRIMARY KEY,
    Username varchar(100),
    LastName varchar(100),
	UPassword varchar(100),
	UNIQUE (Username)
);

--EXEC sp_rename 'MASTERUSER.FirstName', 'Username', 'COLUMN';
--ALTER TABLE MASTERUSER
--ADD UNIQUE (Username);

create table ToDoList(
	ToDoListID int IDENTITY(1,1) PRIMARY KEY,
    TDName varchar(100),
	 MappedUserID INT,
	FOREIGN KEY (MappedUserID) REFERENCES MASTERUSER(USERID)
);

Create TABLE MappingTaskList (
    TaskID int IDENTITY(1,1) PRIMARY KEY,
    TaskName varchar(100),
    TaskStatus int,
    MappedListID int,
    MappedUserID int,
    createdDate DateTime,
    updatedDate DateTime,
    FOREIGN KEY (MappedUserID) REFERENCES MASTERUSER(USERID) ,
    FOREIGN KEY (MappedListID) REFERENCES ToDoList(ToDoListID)
);


-- PROCEDURE TO INSERT USER
CREATE PROCEDURE sp_InsertUser
    @UserName VARCHAR(50),
	@LastName VARCHAR(50),
    @UPassword VARCHAR(50)
AS
BEGIN
    -- Check if the login ID already exists in the table
    IF NOT EXISTS (SELECT 1 FROM MASTERUSER WHERE Username = @UserName)
    BEGIN
        -- Insert the new login ID and password
        INSERT INTO MASTERUSER (Username, LastName, UPassword)
        VALUES (@UserName, @LastName, @UPassword);
    END
END;

--PROCEDURE TO GET USER
CREATE PROCEDURE sp_MasterGetUser
    @UserName VARCHAR(50),
	 @UPassword VARCHAR(50)
AS
BEGIN
    SELECT * FROM MASTERUSER WHERE [Username] = @UserName AND  UPassword = @UPassword;
END;

--PROCEDURE TO INSERT TASKLIST
CREATE PROCEDURE sp_InsertTASKLIST
    @tdName VARCHAR(50),
	@USERID INT
AS
BEGIN
    INSERT INTO ToDoList(TDNAME, MappedUserID)
    VALUES (@tdName,@USERID);
END;

--PROCEDURE TO SELECT TASKLIST
CREATE PROCEDURE sp_SelectTASKLIST
    @MappedUserID int
AS
BEGIN
    SELECT * FROM ToDoList WHERE MappedUserID = @MappedUserID;
END;

--PROCEDURE TO DELETE TASKLIST
CREATE PROCEDURE [dbo].[sp_DeleteTASKLIST]
    @TodoListID int
AS
BEGIN
    Delete FROM ToDoList WHERE ToDoListID = @TodoListID;
END;
--PROCEDURE TO INSERT TASK
CREATE PROCEDURE sp_InsertTASK
    @TaskName VARCHAR(50),
	@status INT,
	@mappedlistid int,
	@userid INT
AS
BEGIN
    INSERT INTO MappingTaskList(TaskName, TaskStatus, MappedListID, MappedUserID)
    VALUES (@TaskName,@status,@mappedlistid,@userid);
END;

--PROCEDURE TO SELECT TASK 
CREATE PROCEDURE sp_SelectTASKAlongWithList
    @mappedlistid int,
	@userid INT
AS
BEGIN
    SELECT * FROM MappingTaskList WHERE MappedListID = @mappedlistid AND  MappedUserID = @userid;
END;
--PRODEDURE TO UPDATE TASK
CREATE PROCEDURE sp_UpdateTASKAlongWithList
    @TaskName varchar(200),
	@status INT,
	@Taskid int
	
AS
BEGIN
	UPDATE MappingTaskList
	SET TaskName = @TaskName, TaskStatus= @status
	WHERE TaskID = @Taskid;

END;
--PROCEDURE TO DELETE TASK
CREATE PROCEDURE [dbo].[sp_DeleteTASKAlongWithList]
    @taskid int,
	@userid INT
AS
BEGIN
    Delete FROM MappingTaskList WHERE TaskID = @taskid AND  MappedUserID = @userid;
END;
