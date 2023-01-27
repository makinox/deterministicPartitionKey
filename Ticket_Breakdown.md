# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### **STAFF-0001:** Add ability for Facilities to assign custom ids to Agents

**Acceptance Criteria:**
- [ ] Facility should be able to view a list of Agents they work with
- [ ] Facility should be able to assign a custom id to each Agent
- [ ] Custom id should be unique to each Agent within a Facility, but can be reused across different Facilities
- [ ] Custom id should be able to be edited or removed by Facility

**Time**: 4 hours

**Implementation Details:**
- Creathe sql script to a new column "custom_id" to the Agents table in the database
- Run DB migrations for the databases
- Implement validation to ensure that custom ids are unique within a Facility

### **STAFF-0002:** Use custom ids in report generation

**Acceptance Criteria:**
- [ ] Reports should use the custom id assigned by the Facility instead of the internal database id for each Agent
- [ ] Facility should be able to switch between using custom ids and internal ids in report generation

**Time:** 4 hours

**Implementation Details:**
- Modify the generateReport function to check if the Facility has assigned a custom id to the Agent and use that instead of the internal id
- Add a toggle option in the fronted page of Facilities to choose which id to use in report generation

### **STAFF-0003:** Add test cases for custom id functionality

**Acceptance Criteria:**
- [ ] Test cases cover various scenarios of custom id assignment, editing, and removal
- [ ] Test cases cover the report generation functionality using custom ids

**Time:** 2 hours

**Implementation Details:**
- Write e2e for the new frontend code
- Write unit test for the backend part

### **STAFF-0004:** Document custom id functionality

**Acceptance Criteria:**
- [ ] A documentation for the new and update code is provided

**Time:** 1 hour

**Implementation Details:**
- Write or update the documentation in the new or updated proccess