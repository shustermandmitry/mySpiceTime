// ==UserScript==
// @name         Claude Artifact Saver (Error Handling)
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Save Claude's artifacts with improved error handling
// @match        https://claude.ai/chat/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    let rootHandle = null;

    GM_addStyle(`
        #save-artifacts-button {
            position: fixed;
            right: 20px;
            bottom: 80px;
            z-index: 1000;
            padding: 10px;
            background-color: #f0f0f0;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            color: #333;
            font-weight: bold;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        #save-artifacts-button:hover {
            background-color: #e0e0e0;
        }
        #notification-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column-reverse;
            align-items: flex-end;
        }
        .notification {
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 10px;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            transform: translateX(100%);
        }
        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }
    `);

    const showNotification = (message, duration = 3000) => {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            document.body.appendChild(container);
        }
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        container.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => container.removeChild(notification), 300);
        }, duration);
    };

    const getArtifacts = () => {
        const selector = "body > div.flex.min-h-screen.w-full > div > div > div.relative.flex.w-full.flex-1.overflow-x-hidden.overflow-y-scroll.pt-6.md\\:pr-8 > div:nth-child(2) > div.fixed.bottom-0.top-0.flex.w-full.flex-col.transition-\\[width\\].z-\\[5\\].right-0.md\\:w-\\[27rem\\].pt-16.md\\:pb-4.md\\:pr-1 > div > div > div > div > ul:nth-child(4) li";
        return Array.from(document.querySelectorAll(selector))
            .map(item => {
                const key = Object.keys(item).find(k => k.startsWith("__reactFiber$"));
                let fiber = item[key];
                while (fiber && !fiber.memoizedProps) fiber = fiber.return;
                return fiber?.memoizedProps?.children?.props?.artifact;
            })
            .filter(Boolean);
    };

    const getSmartFileName = (artifact) => {
        const { id, language, title, type } = artifact;
        const extensions = {
            'python': 'py',
            'javascript': 'js',
            'typescript': 'ts',
            'css': 'css',
            'html': 'html',
            'text/markdown': 'md',
            'application/vnd.ant.react': 'tsx'
        };

        if (title.includes('/') || title.includes('.')) {
            return title;
        }

        let fileName = title.includes(' ') ? id : title;

        const ext = extensions[language] || extensions[type];
        if (ext && !fileName.endsWith(`.${ext}`)) {
            fileName += `.${ext}`;
        }

        if (['js', 'ts', 'tsx', 'jsx', 'py'].includes(ext) && !fileName.startsWith('src/')) {
            fileName = `src/${fileName}`;
        }

        return fileName;
    };

    const saveArtifact = async (artifact) => {
        const { id, versions } = artifact;
        const content = versions[versions.length - 1].content;
        let fileName = localStorage.getItem(`artifact_${id}`) || getSmartFileName(artifact);

        if (!localStorage.getItem(`artifact_${id}`)) {
            fileName = prompt(`Enter file name for "${artifact.title}":`, fileName) || fileName;
            localStorage.setItem(`artifact_${id}`, fileName);
        }

        try {
            const parts = fileName.split('/');
            const file = parts.pop();
            let dirHandle = rootHandle;

            for (const part of parts) {
                dirHandle = await dirHandle.getDirectoryHandle(part, { create: true });
            }

            const fileHandle = await dirHandle.getFileHandle(file, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            showNotification(`Saved: ${fileName}`);
            return true;
        } catch (err) {
            console.error(`Failed to save ${fileName}:`, err);
            showNotification(`Failed to save ${fileName}`);
            return false;
        }
    };

    const tryExpandArtifacts = () => {
        const expandButton = document.querySelectorAll('.px-2.py-2.gap-1 button')[0];
        if (expandButton) {
            expandButton.click();
            return true;
        }
        return false;
    };

    const saveAllArtifacts = async () => {
        if (!rootHandle) {
            try {
                rootHandle = await window.showDirectoryPicker();
            } catch (err) {
                console.log(err);
                showNotification('Failed to set root folder. Please try again.');
                return;
            }
        }

        let artifacts = getArtifacts();
        if (artifacts.length === 0) {
            showNotification('No artifacts found. Attempting to expand...');
            if (tryExpandArtifacts()) {
                setTimeout(() => {
                    artifacts = getArtifacts();
                    if (artifacts.length === 0) {
                        showNotification('Still no artifacts found after expanding.');
                    } else {
                        proceedWithSaving(artifacts);
                    }
                }, 1000); // Wait for 1 second after expanding
            } else {
                showNotification('No expand button found. Unable to save artifacts.');
            }
        } else {
            proceedWithSaving(artifacts);
        }
    };

    const proceedWithSaving = async (artifacts) => {
        showNotification('Saving artifacts...');
        const results = await Promise.all(artifacts.map(saveArtifact));
        const savedCount = results.filter(Boolean).length;
        showNotification(`Saved ${savedCount} out of ${artifacts.length} artifacts.`);
    };

    const saveButton = document.createElement('button');
    saveButton.id = 'save-artifacts-button';
    saveButton.textContent = 'Save Artifacts';
    saveButton.onclick = saveAllArtifacts;
    document.body.appendChild(saveButton);
})();
