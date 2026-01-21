const updateAssignment = (assign, propsToUpdate) => {
    return { ...assign, ...propsToUpdate };
};
const assign1 = {
    studentId: "aids123",
    title: "capstone project",
    grade: 0,
};
console.log(updateAssignment(assign1, { grade: 100 }));
const assignGraded = updateAssignment(assign1, { grade: 100 });
const recordAssignment = (assign) => {
    return assign;
};
const assignVerified = { ...assignGraded, verified: true };
// assignVerified.grade = 90;
recordAssignment({ ...assignGraded, verified: true });
const hexColorMap = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF",
};
const finalGrades = {
    Sara: "B",
    Kelly: "U",
};
const gradeData = {
    Sara: { assign1: 85, assign2: 93 },
    Kelly: { assign1: 76, assign2: 15 },
};
const score = {
    studentId: "k123",
    grade: 85,
};
const preview = {
    studentId: "k123",
    title: "capstone",
};
// type newAssign = {
//     title: string;
//     points: number;
// };
const createNewAssign = (title, points) => {
    return { title, points };
};
const tsAssign = createNewAssign("Utility Types", 100);
console.log(tsAssign);
const assignArgs = ["Generics", 100];
const tsAssign2 = createNewAssign(...assignArgs);
console.log(tsAssign2);
export {};
