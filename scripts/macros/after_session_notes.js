const MacroName = 'after_session_notes';
await game.settings.register(MacroName, 'inspiration', {
    name: 'Inspiration',
    hint: 'Stores the names who got inspiration last session',
    scope: 'user',
    config: false,
    type: String,
    default: '',
    filePicker: false,
    requiresReload: false,
});
await game.settings.register(MacroName, 'next_longrest', {
    name: 'Next longrest',
    hint: 'Stores the next longrest date',
    scope: 'user',
    config: false,
    type: String,
    default: '',
    filePicker: false,
    requiresReload: false,
});
await game.settings.register(MacroName, 'last_payout', {
    name: 'Last Payout',
    hint: 'Stores the date of the last payout',
    scope: 'user',
    config: false,
    type: String,
    default: '',
    filePicker: false,
    requiresReload: false,
});
await game.settings.register(MacroName, 'notes', {
    name: 'Free text notes',
    hint: 'Stores some free text notes',
    scope: 'user',
    config: false,
    type: String,
    default: '',
    filePicker: false,
    requiresReload: false,
});
await game.settings.register(MacroName, 'notes_width', {
    name: 'Notes Textarea last size',
    hint: 'Stores the width of the Notes Textarea',
    scope: 'user',
    config: false,
    type: Number,
    default: 300,
    filePicker: false,
    requiresReload: false,
});
await game.settings.register(MacroName, 'notes_height', {
    name: 'Free text notes',
    hint: 'Stores the height of the Notes Textarea',
    scope: 'user',
    config: false,
    type: Number,
    default: 300,
    filePicker: false,
    requiresReload: false,
});
await game.settings.register('weather_macro', 'lastWeather', {
    name: 'Last Weather',
    hint: 'Stores the last result',
    scope: 'user',
    config: false,
    type: Object,
    default: {},
    filePicker: false,
    requiresReload: false,
});

const editor = foundry.applications.elements.HTMLProseMirrorElement.create({
    name: 'notes',
    value: game.settings.get(MacroName, 'notes'),
    toggled: false
});
editor.id = 'notes';
editor.style.height = '100%';
editor.style.width = '100%';

const popupTemplate = `
<table style="margin: 0">
  <tr>
    <td><label for='inspiration'>Inspiration</label></td>
    <td><input type='text' id='inspiration' value='${game.settings.get(MacroName, 'inspiration')}'></td>
  </tr>
  <tr>
    <td><label for='next_longrest'>Nächste Longrest</label></td>
    <td><input type='text' id='next_longrest' value='${game.settings.get(MacroName, 'next_longrest')}'></td>
  </tr>
  <tr>
    <td><label for='last_payout'>Letzte Auszahlung</label></td>
    <td><input type='text' id='last_payout' value='${game.settings.get(MacroName, 'last_payout')}'></td>
  </tr>
  <tr>
    <td><label for='notes'>Freitext Notizen</label></td>
    <td style="
        min-height: 300px; min-width: 300px;
        resize: both; overflow: auto;
        height: ${game.settings.get(MacroName, 'notes_height')}px;
        width: ${game.settings.get(MacroName, 'notes_width')}px;">
        ${editor.outerHTML}
    </td>
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
            if (input.tagName.toUpperCase() === 'PROSE-MIRROR') {
                input.save();
                val = input.value;
                const parent = input.parentElement;
                if (parent.style.resize === 'both') {
                    const {width, height} = parent.getBoundingClientRect();
                    await game.settings.set(MacroName, properKey + "_width", Math.round(width));
                    await game.settings.set(MacroName, properKey + "_height", Math.round(height));
                }
            }
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
    window: {title: 'After Session Notes'},
    content: popupTemplate,
    buttons: [{
        action: 'ok',
        icon: '<i class="fas fa-check"></i>',
        label: "Done!",
        default: true,
        callback: (_, button, __) => action(button, printNotes)
    }, {
        action: 'save',
        icon: '<i class="fas fa-check"></i>',
        label: "Save!",
        default: true,
        callback: (_, button, __) => action(button, () => {
            ui.notifications.info("Die Änderungen sind gespeichert.");
        })
    }, {
        action: 'cancel',
        icon: '<i class="fas fa-times"></i>',
        label: "Never mind",
    }],
    submit: () => {
        /* ignored */
    }
});
d.render(true).then((dialog) => {
    dialog.element.querySelector('.ProseMirror').style.background = 'var(--background-color, var(--color-cool-5))';
});

async function printNotes(formData) {
    let weatherMessageContent = game.settings.get('weather_macro', 'lastWeather').content;

    const content = `
        <h1>After Session Notes</h1>
        <p><b>Inspiration:</b> ${formData.inspiration}</p>
        
        <p>
            <b>Nächste Long Rest möglich:</b><br>${formData.next_longrest}
        </p>
        
        <p>
            <b>Letzte Auszahlung (3G/Person):</b><br>${formData.last_payout}
        </p>
        
        <hr>
        
        <h5 style="margin-top: 10px; margin-bottom: 5px; color: #333333;">
            Notizen:
        </h5>
        
        ${formData.notes}
        
        <hr>
        
        ${weatherMessageContent}
    `;

    ChatMessage.create({
        content: content,
        speaker: {
            alias: "Dungeon Master"
        },
        whisper: [],
        blind: false,
        rollMode: "publicroll"
    });
}