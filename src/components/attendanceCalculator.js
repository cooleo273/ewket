// Function to calculate subject-wise attendance percentages
export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    if (totalSessions === 0 || presentCount === 0) {
        return 0;
    }
    const percentage = (presentCount / totalSessions) * 100;
    return percentage.toFixed(2); // Limit to two decimal places
};

// Function to group attendance data by subject
export const groupAttendanceBySubject = (subjectAttendance) => {
    const attendanceBySubject = {};

    // Check if subjectAttendance is defined and not null
    if (!subjectAttendance || subjectAttendance.length === 0) {
        return attendanceBySubject; // Return an empty object or handle as needed
    }

    subjectAttendance.forEach((attendance) => {
        // Ensure attendance.subName is defined before accessing its properties
        const subName = attendance.subName ? attendance.subName : 'Unknown Subject';
        const sessions = attendance.subName ? parseInt(attendance.subName.sessions) : 0;
        const subId = attendance.subName ? attendance.subName._id : null;

        if (!attendanceBySubject[subName]) {
            attendanceBySubject[subName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId
            };
        }
        if (attendance.status === "Present") {
            attendanceBySubject[subName].present++;
        } else if (attendance.status === "Absent") {
            attendanceBySubject[subName].absent++;
        }
        attendanceBySubject[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });

    return attendanceBySubject;
};

// Function to calculate overall attendance percentage
export const calculateOverallAttendancePercentage = (subjectAttendance) => {
    // Check if subjectAttendance is defined and not null
    if (!subjectAttendance || subjectAttendance.length === 0) {
        return 0;
    }

    let totalSessionsSum = 0;
    let presentCountSum = 0;
    const uniqueSubIds = [];

    subjectAttendance.forEach((attendance) => {
        const subName = attendance.subName ? attendance.subName : 'Unknown Subject';
        const subId = attendance.subName ? attendance.subName._id : null;
        const sessions = attendance.subName ? parseInt(attendance.subName.sessions) : 0;

        if (subId && !uniqueSubIds.includes(subId)) {
            totalSessionsSum += sessions;
            uniqueSubIds.push(subId);
        }

        presentCountSum += attendance.status === "Present" ? 1 : 0;
    });

    if (totalSessionsSum === 0 || presentCountSum === 0) {
        return 0;
    }

    return ((presentCountSum / totalSessionsSum) * 100).toFixed(2);
};
