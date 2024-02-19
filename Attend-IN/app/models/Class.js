/* eslint-disable semi */
class Class {
  constructor (sectionId, crn, userId, isTeacher, name, startClassTimes, endClassTimes, classLat, classLong) {
    this.sectionId = sectionId;
    this.crn = crn;
    this.userId = userId;
    this.isTeacher = isTeacher;
    this.name = name;
    this.startClassTimes = startClassTimes;
    this.endClassTimes = endClassTimes;
    this.classLat = classLat;
    this.classLong = classLong;
  }
}

export { Class }
