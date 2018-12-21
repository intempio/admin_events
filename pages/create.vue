<template>
  <section class="content main">
    <div class="form-row first-row">
      <p class="event_code">
        <strong>Event Code:</strong>100001
      </p>
      <label>
        <strong>Project:</strong>
      </label>
      <b-select placeholder="Project">
        <option>Sunovion</option>
        <option>Biogen</option>
        <option>Novartis</option>
      </b-select>
      <label>
        <strong>Event Name:</strong>
      </label>
      <input type="text" name="event_name" placeholder="Event Name" class="input">
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
      <button class="history">
        <font-awesome-icon class="icon" icon="history"/>History
      </button>
      <b-select placeholder="Operations Status">
        <option>None</option>
        <option>Content OK</option>
        <option>Landing page OK</option>
        <option>AC Room OK</option>
        <option>Email OK</option>
        <option>2 day QA OK</option>
        <option>Day of Event OK</option>
      </b-select>
      <button class="history">
        <font-awesome-icon class="icon" icon="history"/>History
      </button>
      <b-select placeholder="QA Status">
        <option>None</option>
        <option>Week QA OK</option>
        <option>Week QA Issues</option>
        <option>Report QA OK</option>
      </b-select>
      <button class="history">
        <font-awesome-icon class="icon" icon="history"/>History
      </button>
      <b-select placeholder="Production Status">
        <option>None</option>
        <option>Sent</option>
        <option>Question</option>
        <option>Accepted</option>
        <option>Denied</option>
        <option>Run Sheet OK</option>
        <option>Production Ready</option>
      </b-select>
      <button class="history">
        <font-awesome-icon class="icon" icon="history"/>History
      </button>
    </div>
    <div class="form-row third-row">
      <div class="pickers-wrap">
        <div class="date-time-picker-wrap">
          <vue-ctk-date-time-picker
            class="ctk-date-time-picker"
            label="Event Start"
            v-model="value"
            without-header
            :minute-interval="30"
          ></vue-ctk-date-time-picker>
        </div>
        <!-- <div class="time-zones-wrap"> -->
        <b-select class="time-zones" placeholder="Time zone">
          <option>GMT</option>
          <option>GMT+1</option>
          <option>GMT+2</option>
          <option selected>GMT-5</option>
          <option>GMT-6</option>
          <option>GMT-7</option>
          <option>GMT-8</option>
          <option>GMT-9</option>
        </b-select>
        <!--</div>-->
        <!--<div class="duration-offset-count-wrap">-->
        <input type="text" name="duration" placeholder="Duration" class="input">
        <input type="text" name="prod_offset" placeholder="ProducerOffset" class="input">
        <input type="text" name="prod_count" placeholder="ProducerCount" class="input">
        <!--</div>-->
      </div>
    </div>
    <div class="form-row fourth-row">
      <div class="internal-notes-wrap">
        <textarea placeholder="Internal notes" class="input"></textarea>
        <button class="history">
          <font-awesome-icon class="icon" icon="history"/>History
        </button>
      </div>
      <div class="producer-notes-wrap">
        <textarea placeholder="Producer notes" class="input"></textarea>
        <button class="history">
          <font-awesome-icon class="icon" icon="history"/>History
        </button>
      </div>
      <div class="external-notes-wrap">
        <div v-show="!isHidden" class="additionals">
          <textarea placeholder="External notes" class="input"></textarea>
          <button class="history">
            <font-awesome-icon class="icon" icon="history"/>History
          </button>
        </div>
        <button
          @click="isHidden = !isHidden"
          class="add_btn"
          id="showNotesBtn"
          v-show="isHidden"
        >+ External Notes</button>
      </div>
    </div>
    <div class="form-row fifth-row">
      <div class="assignee width">
        <h2 class="colored">People Assigned</h2>
        <table class="assignee-list">
          <thead>
            <tr>
              <td>Person
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Role
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="#openModal">Michelle Jordan</a>
              </td>
              <!--<div id="openModal" class="modalDialog">
                  <div>
                    <a href="#close" title="Close" class="close">X</a>
                    <h2>Details</h2>
                    <p>
                      <strong>Phone Number:</strong> 124334656456
                    </p>
                    <p>
                      <strong>Email Address:</strong> test@test.com
                    </p>
                  </div>
              </div>-->
              <td>Primary Contact</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#openModal">Edward Colegado</a>
              </td>
              <td>Producer</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#openModal">Shylla Punzalan</a>
              </td>
              <td>Lead Operations</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="wrap-pagination-add">
          <div class="pagination-wrap">
            <button>&laquo;</button>
            <button>&raquo;</button>
          </div>
          <div class="add-new-record">
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
          </div>
        </div>
      </div>
      <div class="checklists width">
        <h2 class="colored">Checklists</h2>
        <table class="assignee-list">
          <thead>
            <tr>
              <td>Items
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Content
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Deck 1</td>
              <td>some text</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Deck 2</td>
              <td>some text 2</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Speaker 1</td>
              <td>some text 3</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="wrap-pagination-add">
          <div class="pagination-wrap">
            <button>&laquo;</button>
            <button>&raquo;</button>
          </div>
          <div class="add-new-record">
            <b-select placeholder="Items">
              <option>Name</option>
              <option>Description</option>
              <option>Producer-onsite</option>
              <option>Seminar-room</option>
              <option>Recording</option>
              <option>Audio Number</option>
            </b-select>
            <input type="text" name="url" placeholder="some text 4" class="input input-items">
            <button class="add_btn">+ Add</button>
          </div>
        </div>
      </div>
    </div>
    <div class="form-row sixth-row">
      <div class="product-sec width">
        <h2 class="colored">Products</h2>
        <table class="assignee-list">
          <thead>
            <tr>
              <td>Item name
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Content
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>test text</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>some text here</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Producer-onsite</td>
              <td>some text here</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="wrap-pagination-add">
          <div class="pagination-wrap">
            <button>&laquo;</button>
            <button>&raquo;</button>
          </div>
          <div class="add-new-record">
            <b-select placeholder="Person">
              <option>Shylla Punzalan</option>
              <option>Jeff Ceniza</option>
              <option>Jove Aso</option>
              <option>Michelle Jordan</option>
              <option>Jaclyn Stephens</option>
              <option>Edward Colegado</option>
            </b-select>
            <input type="text" name="url" placeholder="input some text " class="input input-items">
            <button class="add_btn">+ Add</button>
          </div>
        </div>
      </div>
      <div class="client width">
        <h2 class="colored">Clients</h2>
        <table class="assignee-list">
          <thead>
            <tr>
              <td>Item
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Description
                <font-awesome-icon icon="caret-down" size="lg"/>
              </td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PO#</td>
              <td>some text</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Event Identifier</td>
              <td>some text here</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
            <tr>
              <td>Brand</td>
              <td>Some text here</td>
              <td>
                <a>
                  <font-awesome-icon icon="edit"/>Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="wrap-pagination-add">
          <div class="pagination-wrap">
            <button>&laquo;</button>
            <button>&raquo;</button>
          </div>
          <div class="add-new-record">
            <b-select placeholder="Items">
              <option>PO#</option>
              <option>Event Identifier</option>
              <option>Brand</option>
            </b-select>
            <input type="text" name="url" placeholder="input some text " class="input input-items">
            <button class="add_btn">+ Add</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css'

Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker)

export default {
  data() {
    return {
      value: null,
      isHidden: true
    }
  },
  methods: {
    //showNotes: function() {}
  }
}
</script>
