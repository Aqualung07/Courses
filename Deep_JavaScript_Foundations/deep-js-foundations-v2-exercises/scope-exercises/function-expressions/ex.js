// **********************************************
// 					PART 1						|
// **********************************************

function printRecords(recordIds) {

	let studentPrintableRecord = [];

	// **********************************************

	function isStudentEnrolled(student) {
		return recordIds.indexOf(student.id) !== -1;
	}

	function studentById(student) {
		if ( isStudentEnrolled(student) ) return student;
	}

	function findAndSaveStudentRecords() {
		studentPrintableRecord = studentRecords.filter(studentById);
	}

	// **********************************************

	function sortAscending(prevStudent, currStudent) {
		if (prevStudent.name < currStudent.name) return -1;
		if (prevStudent.name > currStudent.name) return 1;
		return 0;
	}

	function sortStudentRecordsByNameAscending() {
		studentPrintableRecord.sort(sortAscending)
	}

	// **********************************************

	function isEnrollmentPaid(student) {
		return student.paid ? 'Paid' : 'Not Paid';
	}

	function stringifyRecord(student) {
		return `${student.name} (${student.id}): ${isEnrollmentPaid(student)}`;
	}

	function stringifyStudentRecords() {
		studentPrintableRecord = studentPrintableRecord.map(stringifyRecord)
	}

	// **********************************************

	findAndSaveStudentRecords();
	sortStudentRecordsByNameAscending();
	stringifyStudentRecords();

	return console.log(studentPrintableRecord);
}

function paidStudentsToEnroll() {

	let paidStudentsToEnrollRecord;

	// ****************************************************
	function isStudentEnrolled(student) {
		return currentEnrollment.indexOf(student.id) !== -1;
	}

	function getPaidStudentsIdToEnroll(student) {
		if (student.paid && !isStudentEnrolled(student) ) {
			return student.id;
		}
	}
	// ****************************************************

	paidStudentsToEnrollRecord = [
		...studentRecords.map(getPaidStudentsIdToEnroll), 
		...currentEnrollment
	];

	return paidStudentsToEnrollRecord;
}

function remindUnpaid(recordIds) {
	
	let unpaidStudentsRecord;

	// ****************************************************

	function isRecorded(student) {
		return recordIds.indexOf(student.id) !== -1;
	}

	function getUnpaidStudentsId(student) {
		if (isRecorded(student) && !student.paid) return student.id;
	}

	// ****************************************************

	unpaidStudentsRecord = studentRecords.map(getUnpaidStudentsId);

	return printRecords(unpaidStudentsRecord);

}

// **********************************************
// 					PART 2						|
// **********************************************

// function printRecords(recordIds) {

// 	let studentPrintableRecord = [];

// 	studentPrintableRecord = studentRecords.filter((student) => {
// 		if (recordIds.indexOf(student.id) !== -1) return student;
// 	});

// 	studentPrintableRecord.sort((a,b) => a.name > b.name ? 1 : -1);
	
// 	studentPrintableRecord = studentPrintableRecord.map(
// 		(student) => `${student.name} (${student.id}): ${student.paid ? 'Paid' : 'Not Paid'}`
// 	)

// 	return console.log(studentPrintableRecord);
// }

// function paidStudentsToEnroll() {

// 	const paidStudentsToEnrollRecord = [
// 		...studentRecords.map((student) => {
// 			if (student.paid && currentEnrollment.indexOf(student.id) == -1) {
// 				return student.id;
// 			}
// 		}), 
// 		...currentEnrollment
// 	];

// 	return paidStudentsToEnrollRecord;
// }

// function remindUnpaid(recordIds) {

// 	const unpaidStudentsRecord = studentRecords.map((student) => {
// 		if (recordIds.indexOf(student.id) !== -1 && !student.paid) return student.id;
// 	});

// 	return printRecords(unpaidStudentsRecord);

// }


// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
 console.log("----");
 currentEnrollment = paidStudentsToEnroll();
 printRecords(currentEnrollment);
 console.log("----");
 remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
