import * as vscode from 'vscode';
import * as path from 'path';

import { ReviewStateEnum } from './Enums';
import { ReviewDescriptorDTO } from './ReviewDescriptorDTO';

export class ReviewTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly contextValue: string = '',
        public readonly review?: ReviewDescriptorDTO
    ) {
        super(label, collapsibleState);

        if (review) {
            this.command = {
                command: 'upsource.openReviewInBrowser',
                title: '',
                arguments: [ this.review ]
            };

            let icon = 'code.svg';
            if (review.isReadyToClose) icon = 'check.svg';
            if (review.discussionCounter.hasUnresolved) icon = 'concern.svg';
            if (review.state == ReviewStateEnum.Closed) icon = 'closed.svg';

            this.iconPath = {
                light: path.join(__filename, '..', '..', '..', '..', 'resources', 'light', icon),
                dark: path.join(__filename, '..', '..', '..', '..', 'resources', 'dark', icon)
            };            
        }

        if (contextValue == 'folder') {
            this.iconPath = {
                light: path.join(__filename, '..', '..', '..', '..', 'resources', 'light', 'folder.svg'),
                dark: path.join(__filename, '..', '..', '..', '..', 'resources', 'dark', 'folder.svg')
            };            
        }

    }
}
