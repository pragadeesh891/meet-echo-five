import React, { useState } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../base/i18n/functions';
import SettingsButton from '../../settings/components/web/SettingsButton';
import { SETTINGS_TABS } from '../../settings/constants';
import { AbstractWelcomePage, IProps, _mapStateToProps } from './AbstractWelcomePage';

// Mode types
type WelcomeMode = 'main' | 'create' | 'join';
type UserRole = 'teacher' | 'parent' | 'student' | null;
type MeetingType = 'parent-teacher' | 'class' | null;

/**
 * Custom Welcome Page for ECHO-FIVE-MEET
 */
class CustomWelcomePage extends AbstractWelcomePage<IProps> {
    _roomInputRef: HTMLInputElement | null;

    /**
     * Initializes a new CustomWelcomePage instance.
     */
    constructor(props: IProps) {
        super(props);

        this.state = {
            ...this.state,
            mode: 'main' as WelcomeMode,
            userRole: null as UserRole,
            meetingType: null as MeetingType,
            generatedRoomId: '',
            joinRoomId: ''
        } as any;

        this._roomInputRef = null;

        // Bind methods
        this._setMode = this._setMode.bind(this);
        this._setUserRole = this._setUserRole.bind(this);
        this._setMeetingType = this._setMeetingType.bind(this);
        this._generateMeetingId = this._generateMeetingId.bind(this);
        this._handleCreateMeeting = this._handleCreateMeeting.bind(this);
        this._handleJoinMeeting = this._handleJoinMeeting.bind(this);
        this._handleJoinInputChange = this._handleJoinInputChange.bind(this);
        this._copyMeetingId = this._copyMeetingId.bind(this);
        this._copyMeetingLink = this._copyMeetingLink.bind(this);
        this._goBack = this._goBack.bind(this);
        this._setRoomInputRef = this._setRoomInputRef.bind(this);
    }

    /**
     * Implements React's {@link Component#componentDidMount()}.
     */
    override componentDidMount() {
        super.componentDidMount();
        document.body.classList.add('welcome-page', 'custom-welcome-page');
        document.title = 'ECHO-FIVE-MEET';
    }

    /**
     * Removes the classname used for custom styling of the welcome page.
     */
    override componentWillUnmount() {
        super.componentWillUnmount();
        document.body.classList.remove('welcome-page', 'custom-welcome-page');
    }

    /**
     * Sets the current mode.
     */
    _setMode(mode: WelcomeMode) {
        (this.setState as any)({ mode });
    }

    /**
     * Sets the user role.
     */
    _setUserRole(role: UserRole) {
        (this.setState as any)({ userRole: role });
    }

    /**
     * Sets the meeting type and generates room ID.
     */
    _setMeetingType(type: MeetingType) {
        (this.setState as any)({ meetingType: type }, () => {
            this._generateMeetingId();
        });
    }

    /**
     * Generates a unique meeting ID.
     */
    _generateMeetingId() {
        const { userRole, meetingType } = (this.state as any);
        const prefix = meetingType === 'parent-teacher' ? 'PTM' : 'CLASS';
        const roleCode = userRole === 'teacher' ? 'T' : userRole === 'parent' ? 'P' : 'S';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        const roomId = `${prefix}-${roleCode}-${timestamp}-${random}`;
        (this.setState as any)({ generatedRoomId: roomId });
    }

    /**
     * Copies meeting ID to clipboard.
     */
    _copyMeetingId() {
        const { generatedRoomId } = (this.state as any);
        
        navigator.clipboard.writeText(generatedRoomId).then(() => {
            alert('Meeting ID copied to clipboard!\n\n' + generatedRoomId);
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = generatedRoomId;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Meeting ID copied to clipboard!\n\n' + generatedRoomId);
        });
    }

    /**
     * Copies meeting link to clipboard.
     */
    _copyMeetingLink() {
        const { generatedRoomId } = (this.state as any);
        const fullUrl = `${window.location.origin}/${generatedRoomId}`;
        
        navigator.clipboard.writeText(fullUrl).then(() => {
            alert('Meeting link copied to clipboard!\n\n' + fullUrl);
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = fullUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Meeting link copied to clipboard!\n\n' + fullUrl);
        });
    }

    /**
     * Handles starting the meeting (navigates to the conference room).
     */
    _handleCreateMeeting() {
        const { generatedRoomId } = (this.state as any);
        if (generatedRoomId) {
            // Navigate to the meeting room
            window.location.href = `/${generatedRoomId}`;
        }
    }

    /**
     * Handles joining a meeting with pasted ID or link.
     */
    _handleJoinMeeting(event?: React.FormEvent) {
        if (event) {
            event.preventDefault();
        }
        let { joinRoomId } = (this.state as any);
        
        if (joinRoomId.trim()) {
            // Extract room ID if full URL is pasted
            if (joinRoomId.includes('http://') || joinRoomId.includes('https://')) {
                const urlParts = joinRoomId.split('/');
                joinRoomId = urlParts[urlParts.length - 1];
            }
            
            // Navigate to the meeting room
            window.location.href = `/${joinRoomId}`;
        }
    }

    /**
     * Handles input change for join room ID.
     */
    _handleJoinInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        (this.setState as any)({ joinRoomId: event.target.value });
    }



    /**
     * Goes back to the previous screen.
     */
    _goBack() {
        const { mode } = (this.state as any);
        if (mode === 'join') {
            (this.setState as any)({ mode: 'main', joinRoomId: '' });
        } else if (mode === 'create') {
            const { userRole, meetingType, generatedRoomId } = (this.state as any);
            if (generatedRoomId) {
                (this.setState as any)({ meetingType: null, generatedRoomId: '' });
            } else if (meetingType) {
                (this.setState as any)({ meetingType: null });
            } else if (userRole) {
                (this.setState as any)({ userRole: null });
            } else {
                (this.setState as any)({ mode: 'main' });
            }
        }
    }

    /**
     * Sets the room input ref.
     */
    _setRoomInputRef(el: HTMLInputElement) {
        this._roomInputRef = el;
    }

    /**
     * Renders the main landing screen with CREATE and JOIN options.
     */
    _renderMainScreen() {
        return (
            <div className="echo-main-screen">
                <h1 className="echo-title">ECHO-FIVE-MEET</h1>
                <p className="echo-subtitle">Connect, Collaborate, Educate</p>
                
                <div className="echo-action-buttons">
                    <button
                        className="echo-button echo-button-create"
                        onClick={() => this._setMode('create')}>
                        <span className="echo-button-icon">➕</span>
                        <span className="echo-button-text">CREATE MEETING</span>
                        <span className="echo-button-desc">Start a new meeting</span>
                    </button>
                    
                    <button
                        className="echo-button echo-button-join"
                        onClick={() => this._setMode('join')}>
                        <span className="echo-button-icon">🔗</span>
                        <span className="echo-button-text">JOIN MEETING</span>
                        <span className="echo-button-desc">Enter with meeting link</span>
                    </button>
                </div>
            </div>
        );
    }

    /**
     * Renders the role selection screen.
     */
    _renderRoleSelection() {
        return (
            <div className="echo-selection-screen">
                <h2 className="echo-screen-title">Select Your Role</h2>
                <p className="echo-screen-subtitle">Choose your role to continue</p>
                
                <div className="echo-role-buttons">
                    <button
                        className="echo-role-button"
                        onClick={() => this._setUserRole('teacher')}>
                        <span className="echo-role-icon">👨‍🏫</span>
                        <span className="echo-role-text">Teacher</span>
                    </button>
                    
                    <button
                        className="echo-role-button"
                        onClick={() => this._setUserRole('parent')}>
                        <span className="echo-role-icon">👨‍👩‍👧</span>
                        <span className="echo-role-text">Parent</span>
                    </button>
                </div>
                
                <button className="echo-back-button" onClick={this._goBack}>
                    ← Back
                </button>
            </div>
        );
    }

    /**
     * Renders the meeting type selection screen.
     */
    _renderMeetingTypeSelection() {
        return (
            <div className="echo-selection-screen">
                <h2 className="echo-screen-title">Select Meeting Type</h2>
                <p className="echo-screen-subtitle">What type of meeting do you want to create?</p>
                
                <div className="echo-meeting-type-buttons">
                    <button
                        className="echo-meeting-type-button"
                        onClick={() => this._setMeetingType('parent-teacher')}>
                        <span className="echo-meeting-icon">👥</span>
                        <span className="echo-meeting-text">Parent-Teacher Meeting</span>
                        <span className="echo-meeting-desc">One-on-one discussion</span>
                    </button>
                    
                    <button
                        className="echo-meeting-type-button"
                        onClick={() => this._setMeetingType('class')}>
                        <span className="echo-meeting-icon">📚</span>
                        <span className="echo-meeting-text">Class Meeting</span>
                        <span className="echo-meeting-desc">Virtual classroom session</span>
                    </button>
                </div>
                
                <button className="echo-back-button" onClick={this._goBack}>
                    ← Back
                </button>
            </div>
        );
    }

    /**
     * Renders the generated meeting ID screen.
     */
    _renderGeneratedMeeting() {
        const { generatedRoomId, userRole, meetingType } = (this.state as any);
        const fullUrl = `${window.location.origin}/${generatedRoomId}`;
        
        return (
            <div className="echo-generated-screen">
                <h2 className="echo-screen-title">Meeting Created!</h2>
                <p className="echo-screen-subtitle">
                    {meetingType === 'parent-teacher' ? 'Parent-Teacher' : 'Class'} Meeting as {userRole}
                </p>
                
                <div className="echo-meeting-id-container">
                    <div className="echo-id-section">
                        <label className="echo-label">Meeting ID:</label>
                        <div className="echo-meeting-id-display">
                            <code className="echo-meeting-id">{generatedRoomId}</code>
                            <button
                                className="echo-copy-button"
                                onClick={this._copyMeetingId}
                                title="Copy meeting ID">
                                📋 Copy ID
                            </button>
                        </div>
                    </div>
                    
                    <div className="echo-link-section">
                        <label className="echo-label">Meeting Link:</label>
                        <div className="echo-meeting-id-display">
                            <code className="echo-meeting-link">{fullUrl}</code>
                            <button
                                className="echo-copy-button"
                                onClick={this._copyMeetingLink}
                                title="Copy meeting link">
                                📋 Copy Link
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="echo-action-group">
                    <button
                        className="echo-button-primary"
                        onClick={this._handleCreateMeeting}>
                        Start Meeting Now
                    </button>
                    
                    <button className="echo-back-button" onClick={this._goBack}>
                        ← Create Another Meeting
                    </button>
                </div>
                
                <div className="echo-info-box">
                    <p>📌 <strong>Share this link</strong> with participants to join the meeting</p>
                </div>
            </div>
        );
    }

    /**
     * Renders the join meeting screen.
     */
    _renderJoinScreen() {
        const { joinRoomId } = (this.state as any);
        
        return (
            <div className="echo-join-screen">
                <h2 className="echo-screen-title">Join Meeting</h2>
                <p className="echo-screen-subtitle">Enter the meeting link or ID to join</p>
                
                <form onSubmit={this._handleJoinMeeting} className="echo-join-form">
                    <div className="echo-input-container">
                        <label className="echo-label">Meeting Link or ID:</label>
                        <input
                            ref={this._setRoomInputRef}
                            type="text"
                            className="echo-join-input"
                            placeholder="Paste meeting link or ID here..."
                            value={joinRoomId}
                            onChange={this._handleJoinInputChange}
                            autoFocus
                        />
                    </div>
                    
                    <div className="echo-action-group">
                        <button
                            type="submit"
                            className="echo-button-primary"
                            disabled={!joinRoomId.trim()}>
                            Join Meeting
                        </button>
                        
                        <button
                            type="button"
                            className="echo-back-button"
                            onClick={this._goBack}>
                            ← Back
                        </button>
                    </div>
                </form>
                
                <div className="echo-info-box">
                    <p>💡 <strong>Tip:</strong> You can paste the full meeting URL or just the meeting ID</p>
                </div>
            </div>
        );
    }

    /**
     * Renders the appropriate screen based on current mode.
     */
    _renderContent() {
        const { mode, userRole, meetingType, generatedRoomId } = (this.state as any);

        if (mode === 'join') {
            return this._renderJoinScreen();
        }

        if (mode === 'create') {
            if (generatedRoomId) {
                return this._renderGeneratedMeeting();
            }
            if (meetingType) {
                return this._renderMeetingTypeSelection();
            }
            if (userRole) {
                return this._renderMeetingTypeSelection();
            }
            return this._renderRoleSelection();
        }

        return this._renderMainScreen();
    }

    /**
     * Implements React's {@link Component#render()}.
     */
    override render() {
        return (
            <div className="echo-welcome-page" id="echo_welcome_page">
                <div className="echo-header">
                    <div className="echo-header-logo">
                        <img src="images/watermark.svg" alt="ECHO-FIVE-MEET" className="echo-logo" />
                    </div>
                    <div className="echo-settings">
                        <SettingsButton
                            defaultTab={SETTINGS_TABS.CALENDAR}
                            isDisplayedOnWelcomePage={true}
                        />
                    </div>
                </div>

                <div className="echo-content-container">
                    {this._renderContent()}
                </div>

                <footer className="echo-footer">
                    <p>© 2025 ECHO-FIVE-MEET | Empowering Education Through Connection</p>
                </footer>
            </div>
        );
    }
}

export default translate(connect(_mapStateToProps)(CustomWelcomePage));
