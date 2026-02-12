## task 1
FUNCTION username_checker ()
    BEGIN FUNCTION
    RECEIVE username FROM (STRING) KEYBOARD

    IF username = "" THEN
        SEND "Error: blank username" TO DISPLAY
        RETURN
    END IF

    IF LENGTH(username) < 4 OR LENGTH(username) > 12 THEN
        SEND "Error: username must be 4–12 characters" TO DISPLAY
        RETURN
    END IF

    SEND "Username accepted" TO DISPLAY
ENDFUNCTION

## Task 2
FUNCTION stock_level_alert ()
    BEGIN FUNCTION
    SET stock TO -1
    SET status TO ""

    WHILE stock < 0 DO
        SEND "Enter stock level (0 or more)" TO DISPLAY
        RECEIVE stock FROM (INTEGER) KEYBOARD
    ENDWHILE

    IF stock = 0 THEN
        SET status TO "Out of stock"
    ELSE IF stock >= 1 AND stock <= 5 THEN
        SET status TO "Low stock"
    ELSE IF stock >= 6 AND stock <= 20 THEN
        SET status TO "Stock OK"
    ELSE
        SET status TO "High stock"
    END IF

    SEND status TO DISPLAY
    RETURN status
ENDFUNCTION

## task 3
FUNCTION maintenance_due_checker ()
    BEGIN FUNCTION
    SET status TO ""

    RECEIVE daysSinceLastService FROM (INTEGER) KEYBOARD
    RECEIVE serviceFrequency FROM (STRING) KEYBOARD

    IF daysSinceLastService < 0 THEN
        SEND "Error: days must be 0 or more" TO DISPLAY
        RETURN
    END IF

    IF serviceFrequency = "weekly" THEN
        IF daysSinceLastService >= 7 THEN
            SET status TO "Due now"
        ELSE IF daysSinceLastService >= 5 THEN
            SET status TO "Due soon"
        ELSE
            SET status TO "Not due yet"
        END IF

    ELSE IF serviceFrequency = "monthly" THEN
        IF daysSinceLastService >= 30 THEN
            SET status TO "Due now"
        ELSE IF daysSinceLastService >= 28 THEN
            SET status TO "Due soon"
        ELSE
            SET status TO "Not due yet"
        END IF

    ELSE
        SEND "Error: invalid frequency" TO DISPLAY
        RETURN
    END IF

    SEND status TO DISPLAY
ENDFUNCTION

## task 4
FUNCTION priority_classifier ()
    BEGIN FUNCTION
    SET priority TO ""
    SET warning TO ""

    RECEIVE condition FROM (STRING) KEYBOARD
    RECEIVE days FROM (INTEGER) KEYBOARD
    RECEIVE inUse FROM (STRING) KEYBOARD

    IF days < 0 THEN
        SEND "Error: days must be 0 or more" TO DISPLAY
        RETURN
    END IF

    IF condition = "Critical" OR days >= 60 THEN
        SET priority TO "High"
    ELSE IF condition = "Worn" OR (days >= 30 AND days <= 59) THEN
        SET priority TO "Medium"
    ELSE IF condition = "Good" AND days < 30 THEN
        SET priority TO "Low"
    ELSE
        SEND "Error: invalid condition" TO DISPLAY
        RETURN
    END IF

    IF inUse = "Yes" THEN
        SET warning TO " Warning: Machine in use"
    END IF

    SEND priority + warning TO DISPLAY
ENDFUNCTION
