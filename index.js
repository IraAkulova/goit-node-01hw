const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, email, phone, name }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            return console.log(allContacts);
        case "get":
            const oneContact = await contacts.getContactById(id);
            return console.log(oneContact);
        case "remove":
            const deleteContact = await contacts.removeContact(id);
            return console.log(deleteContact);
        case "add":
            const newContact = await contacts.addContact({email, phone, name});
            return console.log(newContact);
        default:
      console.warn("\x1B[31m Unknown action type!");
    }
};

invokeAction(argv);
