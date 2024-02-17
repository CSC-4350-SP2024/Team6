/* eslint-disable semi */
class Class {
  constructor (sectionId, crn, userId, isTeacher, name, startClassTimes, endClassTimes, classLocation) {
    this.sectionId = sectionId;
    this.crn = crn;
    this.userId = userId;
    this.isTeacher = isTeacher;
    this.name = name;
    this.startClassTimes = startClassTimes;
    this.endClassTimes = endClassTimes;
    this.classLocation = classLocation;
  }
}

module.exports = Class
