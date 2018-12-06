<template>
  <section class="content main">
    <form>
      <div class="form-row first-row">
        <p class="event_code">
          <strong>Event Code: </strong>100001</p>
        <label>
          <strong>Project: </strong>
        </label>
        <b-select placeholder="Project">
          <option>Sunovion</option>
          <option>Biogen</option>
          <option>Novartis</option>
        </b-select>
        <label>
          <strong>Event Name: </strong>
        </label> <input type="text" name="event_name" placeholder="Event Name" class="input" />
      </div>
      <div class="form-row second-row">
        <b-select placeholder="Client Status">
          <option>Client urgent</option>
          <option>Client request</option>
          <option>Client update</option>
          <option>In Process</option>
          <option>Scheduled</option>
          <option>Cancelled</option>
        </b-select>
        <button><img src="~/assets/history.png"> History</button>
        <b-select placeholder="Operations Status">
          <option>None</option>
          <option>Content OK</option>
          <option>Landing page OK</option>
          <option>AC Room OK</option>
          <option>Email OK</option>
          <option>2 day QA OK</option>
          <option>Day of Event OK</option>
        </b-select>
        <button><img src="~/assets/history.png"> History</button>
        <b-select placeholder="QA Status">
          <option>None</option>
          <option>Week QA OK</option>
          <option>Week QA Issues</option>
          <option>Report QA OK</option>
        </b-select>
        <button><img src="~/assets/history.png"> History</button>
        <b-select placeholder="Production Status">
          <option>None</option>
          <option>Sent</option>
          <option>Question</option>
          <option>Accepted</option>
          <option>Denied</option>
          <option>Run Sheet OK</option>
          <option>Production Ready</option>
        </b-select>
        <button><img src="~/assets/history.png"> History</button>
      </div>
      <div class="form-row third-row">
        <input type="text" name="event_start" placeholder="Event Start" class="input" />
        <input type="text" name="duration" placeholder="Duration" class="input" />
        <input type="text" name="prod_offset" placeholder="ProducerOffset" class="input" />
        <input type="text" name="prod_count" placeholder="ProducerCount" class="input" />
      </div>
      <div class="form-row fourth-row">
        <textarea placeholder="Internal notes" class="input"></textarea>
        <textarea placeholder="Producer notes" class="input"></textarea>
        <button class="add_btn">+ External Notes</button>
        <div class="additionals">
          <textarea placeholder="External notes" class="input"></textarea>
          <button><img src="~/assets/history.png"> History</button>
        </div>
        <div class="notes-history">
          <div>
            <button><img src="~/assets/history.png"> History</button>
          </div>
          <div>
            <button><img src="~/assets/history.png"> History</button>
          </div>
        </div>
      </div>
      <div class="form-row fifth-row">
        <table class="assignee">
          <tr>
            <td>
              <h2 class="colored">People Assigned</h2>
              <div class="cont">
                <table class="assignee-list">
                  <thead>
                    <tr>
                      <td>Person</td>
                      <td>Role</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#openModal">Michelle Jordan</a>
                      </td>
                      <div id="openModal" class="modalDialog">
                        <div>
                          <a href="#close" title="Close" class="close">X</a>
                          <h2>Details</h2>
                          <p>
                            <strong>Phone Number:</strong> 124334656456</p>
                          <p>
                            <strong>Email Address:</strong> test@test.com</p>
                        </div>
                      </div>
                      <td>Primary Contact</td>
                      <td>
                        <a><img src="~/assets/edit.png"> Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#openModal">Edward Colegado</a>
                      </td>
                      <td>Producer</td>
                      <td>
                        <a><img src="~/assets/edit.png"> Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#openModal">Shylla Punzalan</a>
                      </td>
                      <td>Lead Operations</td>
                      <td>
                        <a><img src="~/assets/edit.png"> Edit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <b-select placeholder="Person">
                <option>Shylla Punzalan</option>
                <option>Jeff Ceniza</option>
                <option>Jove Aso</option>
                <option>Michelle Jordan</option>
                <option>Jaclyn Stephens</option>
                <option>Edward Colegado</option>
              </b-select>
              <b-select placeholder="Role">
                <option>Lead Operations</option>
                <option>Lead Producer</option>
                <option>CSR</option>
                <option>Primary Contact</option>
                <option>Producer</option>
              </b-select>
              <button class="add_btn">+ Add</button>
            </td>
            <td>
              <h2 class="colored">Items</h2>
              <div class="cont">
                <table class="assignee-list">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Type</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Speaker 1</td>
                      <td>https://www.google.com/</td>
                      <td>
                        <a><img src="~/assets/edit.png"> Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Speaker 2</td>
                      <td>https://www.google.com/</td>
                      <td>
                        <a><img src="~/assets/edit.png"> Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Producer 1</td>
                      <td>https://www.google.com/</td>
                      <td>
                        <a><img src="~/assets/edit.png"> Edit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <b-select placeholder="Item">
                <option>Speaker 1</option>
                <option>Speaker 2</option>
                <option>Speaker 3</option>
                <option>Deck 1</option>
              </b-select>
              <input type="text" name="url" placeholder="URL" class="input" />
              <button class="add_btn">+ Add Items</button>
            </td>
          </tr>
        </table>
      </div>
      <br/>
      <h2 class="colored">History</h2>
      <div class="form-row">
        <table border="0" class="history">
          <thead>
            <tr>
              <th>Date Time</th>
              <th>User</th>
              <th>Event Code</th>
              <th>Event Name</th>
              <th>Client Status</th>
              <th>Event Start</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2018-05-30 13:00</td>
              <td>Michelle</td>
              <td>Event Code</td>
              <td>Event Name</td>
              <td>Client Status</td>
              <td>Event Start</td>
              <td>Duration</td>
            </tr>
            <tr>
              <td>2018-05-30 13:00</td>
              <td>Michelle</td>
              <td>Event Code</td>
              <td>Event Name</td>
              <td>Client Status</td>
              <td>Event Start</td>
              <td>Duration</td>
            </tr>
            <tr>
              <td>2018-05-30 13:00</td>
              <td>Michelle</td>
              <td>Event Code</td>
              <td>Event Name</td>
              <td>Client Status</td>
              <td>Event Start</td>
              <td>Duration</td>
            </tr>
            <tr>
              <td>2018-05-30 13:00</td>
              <td>Michelle</td>
              <td>Event Code</td>
              <td>Event Name</td>
              <td>Client Status</td>
              <td>Event Start</td>
              <td>Duration</td>
            </tr>
            <tr>
              <td>2018-05-30 13:00</td>
              <td>Michelle</td>
              <td>Event Code</td>
              <td>Event Name</td>
              <td>Client Status</td>
              <td>Event Start</td>
              <td>Duration</td>
            </tr>
            <tr>
              <td>2018-05-30 13:00</td>
              <td>Michelle</td>
              <td>Event Code</td>
              <td>Event Name</td>
              <td>Client Status</td>
              <td>Event Start</td>
              <td>Duration</td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </section>
</template>
<script>
export default {};
</script>