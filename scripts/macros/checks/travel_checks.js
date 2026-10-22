//-------------------------------------------------------------------------------------
// This part is configuration, you can make changes here, but make sure they are the same across all occurances.
//-------------------------------------------------------------------------------------

const IconHtml = '<img src="https://benny.decker.games/systems/dnd5e/icons/svg/ability-score-improvement.svg" alt="" style="border: none; width: var(--icon-width, var(--icon-size, 1em)); height: var(--icon-height, var(--icon-size, 1em));"/>'
const ToolIconHtml = '<i class="fas fa-hammer"></i>';

//-------------------------------------------------------------------------------------
// Coding begins here, please do not change.
//-------------------------------------------------------------------------------------

const MacroName = 'travel_checks';
await game.settings.register(MacroName, 'dc', {
    name: 'DC',
    hint: 'Stores the dc entered previously',
    scope: 'client',
    config: false,
    type: Number,
    default: 0,
    filePicker: false,
    requiresReload: false,
});

function printCheck(formdata) {
    const buttons = [
        {
            type: 'skill',
            dc: Number(formdata.dc),
            format: 'short',
            ability: 'wis',
            skill: 'sur'
        },
        {
            type: 'tool',
            dc: Number(formdata.dc),
            format: 'short',
            ability: 'wis',
            tool: 'navg'
        }
    ];

    const MessageClass = getDocumentClass("ChatMessage");
    MessageClass.create({
        flavor: _loc("EDITOR.DND5E.Inline.RollRequest"),
        speaker: MessageClass.getSpeaker({user: game.user}),
        system: {broadcast: true, buttons},
        type: "prompt",
        user: game.user.id
    });
}

const popupTemplate = `
<table style="margin: 0">
  <tr>
    <td><label for='dc'>DC</label></td>
    <td><input type='number' id='dc' value='${game.settings.get(MacroName, 'dc')}'></td>
  </tr>
</table>
`;

const IgnoreSavingIds = []

async function action(button, callback) {
    const form = button.form.elements
    const formData = {};

    for (const [key, input] of Object.entries(form)) {
        if (input.tagName === 'BUTTON') {
            continue;
        }
        // not a numbered index
        let properKey = '';
        if (!/^\d+$/.test(key)) {
            properKey = key;
        } else {
            console.log(input, input.id)
            properKey = input.id
        }

        let val;
        if (!input.type || input.type.toLowerCase() !== 'checkbox') {
            val = input.value;
        } else {
            val = input.checked
        }
        formData[properKey] = val;
        if (!IgnoreSavingIds.includes(properKey)) {
            await game.settings.set(MacroName, properKey, val);
        }
    }

    callback(formData);
}

let d = new foundry.applications.api.DialogV2({
    window: {title: 'Navigation Check'},
    content: popupTemplate,
    buttons: [{
        action: 'ok',
        icon: '<i class="fas fa-check"></i>',
        label: "Do it!",
        default: true,
        callback: (_, button, __) => action(button, printCheck)
    }, {
        action: 'cancel',
        icon: '<i class="fas fa-times"></i>',
        label: "Never mind",
    }],
    submit: () => {
        /* ignored */
    }
});
d.render(true);