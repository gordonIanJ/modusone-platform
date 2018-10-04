# Manage Windows 10 Devices

- [Deploy updates using Windows Update for Business](https://docs.microsoft.com/en-us/windows/deployment/update/waas-manage-updates-wufb)
- [Manage the computers with Microsoft Intune](https://docs.microsoft.com/en-us/intune/introduction-intune)
- [Monitor the updates using Microsoft Update Compliance](https://docs.microsoft.com/en-us/windows/deployment/update/update-compliance-monitor)

## Set up Intune

- Supported: Windows 10 (Home, S, Pro, Education, and Enterprise versions)
- To update Windows 10 PCs, they must be running at least Windows 10 Pro with the Windows Anniversary update
- [Licenses that include Intune](https://docs.microsoft.com/en-us/intune/license)
- Steps
  - [Sign up for Intune](https://docs.microsoft.com/en-us/intune/account-sign-up)
  - [Set the mobile device management authority](https://docs.microsoft.com/en-us/intune/mdm-authority-set) > Set the MDM authority to Intune
  - Activate Office 365 MDM in addition to the Intune Service: go to https://protection.office.com, choose Data Loss Prevention > Device Security Policies > View list of Managed Devices > Let's get started.
  - Simplify Windows enrollment without Azure AD Premium, by [creating a CNAME that redirects enrollment requests to Intune servers](https://docs.microsoft.com/en-us/intune/windows-enroll#simplify-windows-enrollment-without-azure-ad-premium)
  - Enroll Devices
    - Once you've set up Intune, users enroll Windows devices by signing in with their work or school account.
    - Tell users [how to enroll their Windows 10 device](https://docs.microsoft.com/en-us/intune-user-help/enroll-your-w10-phone-or-w10-pc-windows)
  - [Manage Software Updates in Intune](https://docs.microsoft.com/en-us/intune/windows-update-for-business-configure)
    - On Windows devices, Feedback & diagnostics > Diagnostic and usage data must be set to at least Basic.
      - Use an Intune device restriction profile to set Feedback & diagnostics > Diagnostic and usage data must be set to at least Basic on every computer
        - See [configure device restriction settings](https://docs.microsoft.com/en-us/intune/device-restrictions-configure)

## Configure your environment for Windows Analytics: Update Compliance

https://docs.microsoft.com/en-us/windows/deployment/update/update-compliance-get-started
