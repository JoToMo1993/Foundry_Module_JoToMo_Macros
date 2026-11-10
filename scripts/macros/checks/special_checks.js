if (canvas.tokens.controlled.length > 0) {
    let d = new foundry.applications.api.DialogV2({
        window: {title: 'Special Checks'},
        content: '',
        buttons: [{
            action: 'grable',
            icon: '<i class="fas fa-check"></i>',
            label: "Grable",
            default: true,
            callback: (_, button, __) => grable()
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
} else {
    foundry.applications.api.DialogV2.prompt({
        window: {title: 'Fehler'},
        content: '<div>Du musst erst ein Token auswählen.</div>',
    });
}

async function grable() {
    const actor = canvas.tokens.controlled[0]?.actor.system;

    if (!actor) return;

    const dc = 8 +
        actor.abilities.str.mod +
        actor.attributes.prof;

    const buttons = [{
        type: 'save',
        dc: Number(dc),
        format: 'short',
        ability: 'dex',
        skill: 'acr'
    }, {
        type: 'save',
        dc: Number(dc),
        format: 'short',
        ability: 'str',
        skill: 'ath'
    }];

    const MessageClass = getDocumentClass("ChatMessage");
    MessageClass.create({
        flavor: _loc("EDITOR.DND5E.Inline.RollRequest"),
        speaker: MessageClass.getSpeaker({user: game.user}),
        system: {broadcast: true, buttons},
        type: "prompt",
        user: game.user.id
    });
}