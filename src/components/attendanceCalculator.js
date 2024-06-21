export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    if (totalSessions === 0 || presentCount === 0) {
        return 0;
    }
    const percentage = (presentCount / totalSessions) * 100;
    return percentage.toFixed(2); // Limit to two decimal places
};


export const groupAttendanceBySubject = (subjectAttendance) => {
    const attendanceBySubject = {};

    subjectAttendance.forEach((attendance) => {
        if (attendance.subName && attendance.subName.subName && attendance.subName.sessions && attendance.subName._id) {
            const subName = attendance.subName.subName;
            const sessions = attendance.subName.sessions;
            const subId = attendance.subName._id;

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
        } else {
            console.warn('Invalid attendance object:', attendance);
        }
    });

    return attendanceBySubject;
}


export const calculateOverallAttendancePercentage = (attendanceData) => {
    if (!attendanceData || attendanceData.length === 0) {
        return 0; // Handle case where attendanceData is empty or undefined
    }

    let totalPresent = 0;
    let totalSessions = 0;

    attendanceData.forEach((attendance) => {
        if (attendance.subName && attendance.subName.sessions) {
            totalPresent += attendance.status === 'Present' ? 1 : 0;
            totalSessions += attendance.subName.sessions;
        }
    });

    if (totalSessions === 0) {
        return 0; // Handle case where totalSessions is zero to avoid division by zero
    }

    const percentage = (totalPresent / totalSessions) * 100;
    return percentage.toFixed(2);
};
