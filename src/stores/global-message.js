import { defineStore } from "pinia";
import { Notify, Dialog } from "quasar";

export const useGlobalMessageStore = defineStore({
  id: "globalMessage",
  state: () => ({
    message: {
      color: "",
      textColor: "",
      icon: "",
      message: "",
    },
  }),
  actions: {
    async confirm(message, callbackOk) {
      Dialog.create({
        title: message.title || "Confirmação",
        message: message.text,
        color: message.color,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        callbackOk();
      });
    },

    async addMessage(message) {
      const objectMessage = this.parse(message);
      Notify.create(objectMessage);
    },

    parse(message) {
      let type = "";
      let color = "";
      let textColor = "";
      let icon = "";

      switch (message.type) {
        case "info":
          type = "info";
          break;
        case "success":
          type = "positive";
          break;
        case "warning":
          type = "warning";
          break;
        case "error":
          type = "negative";
          break;
        default:
          type = undefined;
          color = "grey-8";
          textColor = "white";
          icon = "info";
          console.log(`Mensagem genécica para o tipo ${message.type}.`);
      }

      return type
        ? {
          type,
          group: false,
          message: message.text,
        }
        : {
          color,
          textColor,
          icon,
          group: false,
          message: message.text,
        };
    },
  },
});
