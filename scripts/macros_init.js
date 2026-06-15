Hooks.once("ready", async () => {
    if (!game.user.isGM) return;

    const pack = game.packs.get("jotomo_macros.jotomo-macros");
    await pack.configure({
        locked: false
    });

    await syncCompendiumMacros(pack);

    await pack.configure({
        locked: false
    });
});

const MACROS_CONFIG = [{
    name: 'Gold',
    version: '1.0.1',
    image: 'gold.png',
    content: 'gold.js',
}, {
    name: 'Minions Attack',
    version: '1.0.0',
    image: '',
    content: 'minions_attack_3inputs.js',
}, {
    name: 'Pythagoras',
    version: '1.0.0',
    image: '',
    content: 'pythagoras.js',
}, {
    name: 'Conditions',
    version: '1.0.0',
    image: '',
    content: 'conditions_v2.js',
}, {
    name: 'Weather',
    version: '1.0.0',
    image: '',
    content: 'weather/weather_card_12.js',
}, {
    name: 'Travel Checks',
    version: '1.0.0',
    image: '',
    content: 'checks/travel_checks.js',
}, {
    name: 'Checks',
    version: '1.0.0',
    image: '',
    content: 'checks/checks.js',
}, {
    name: 'Multi Checks',
    version: '1.0.0',
    image: '',
    content: 'checks/multi_checks_multi_types.js',
}
]

async function syncCompendiumMacros(pack) {
    const documents = await pack.getDocuments();
    for (const macroConfig of MACROS_CONFIG) {
        const existing = documents.find(
            m => m.name === macroConfig.name
        );

        if (existing) {
            // update
            const currentVersion = existing.getFlag('jotomo_macros', 'version') ?? '';

            if (currentVersion < macroConfig.version) {
                // update
                const content = {
                    command: await loadMacroSource(macroConfig.content),
                    flags: {
                        'jotomo_macros': {
                            'version': macroConfig.version,
                        }
                    }
                };
                if (!!macroConfig.image) {
                    content.img = `modules/jotomo_macros/assets/images/${macroConfig.image}`;
                }

                await existing.update(content);
            }
        } else {
            // create
            const content = {
                name: macroConfig.name,
                type: 'script',
                command: await loadMacroSource(macroConfig.content),
                flags: {
                    'jotomo_macros': {
                        'version': macroConfig.version,
                    }
                }
            };
            if (!!macroConfig.image) {
                content.img = `modules/jotomo_macros/assets/images/${macroConfig.image}`;
            }
            await Macro.create(content, {
                pack: 'jotomo_macros.jotomo-macros',
            })
        }
    }
}

async function loadMacroSource(filename) {
    const response = await fetch(
        `modules/jotomo_macros/scripts/macros/${filename}`
    );

    if (!response.ok) {
        throw new Error(`Failed to load macro: ${filename}`);
    }

    return response.text();
}