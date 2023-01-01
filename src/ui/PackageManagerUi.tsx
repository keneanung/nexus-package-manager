import React, { useCallback, useEffect, useState } from 'react';
import { IPackageManager } from '../lib/PackageManager';
import { PackageEntry, RepositoryData } from '../lib/RepositoryData';
import { SmallButton, LargeButton } from './Buttons';

const getInstalledPackages = (packageManager: IPackageManager) => {
  return packageManager.getRepositoryData().reduce<InstalledPackagesMap>((packages, entry) => {
    packages[entry.packageName] = packageManager.isInstalled(entry.packageName);
    return packages;
  }, {});
};

type InstalledPackagesMap = {
  [name: string]: boolean;
};

function PackageListRow({
  entry,
  installedPackages,
  packageManager,
  toPackageDetailView,
}: {
  entry: PackageEntry;
  installedPackages: InstalledPackagesMap;
  packageManager: IPackageManager;
  toPackageDetailView: (packageName: string) => void;
}) {
  return (
    <tr>
      <td>{entry.name}</td>
      <td>{entry.packageName}</td>
      <td>{entry.description}</td>
      <td>
        <SmallButton onClick={() => toPackageDetailView(entry.packageName)} text="Details" />
        {installedPackages[entry.packageName] ? (
          <InstalledPackageButtons packageManager={packageManager} packageName={entry.packageName} />
        ) : (
          <NotInstalledPackageButtons packageManager={packageManager} packageName={entry.packageName} />
        )}
      </td>
    </tr>
  );
}

function NotInstalledPackageButtons({
  packageManager,
  packageName,
}: {
  packageManager: IPackageManager;
  packageName: string;
}) {
  return (
    <SmallButton
      onClick={() => {
        packageManager.installAsync(packageName);
      }}
      text="Install"
    />
  );
}

function InstalledPackageButtons({
  packageManager,
  packageName,
}: {
  packageManager: IPackageManager;
  packageName: string;
}) {
  return (
    <>
      <SmallButton
        onClick={() => {
          packageManager.updatePackageAsync(packageName);
        }}
        text="Update"
      />
      <SmallButton
        onClick={() => {
          packageManager.uninstall(packageName);
        }}
        text="Uninstall"
      />
    </>
  );
}

function PackageListing({
  installedPackages,
  packageManager,
  repositoryData,
  toPackageDetailView,
}: {
  installedPackages: InstalledPackagesMap;
  packageManager: IPackageManager;
  repositoryData: RepositoryData;
  toPackageDetailView: (packageName: string) => void;
}) {
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Package Name</td>
          <td>Description</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {repositoryData.map((entry) => (
          <PackageListRow
            entry={entry}
            installedPackages={installedPackages}
            packageManager={packageManager}
            key={entry.packageName}
            toPackageDetailView={toPackageDetailView}
          />
        ))}
      </tbody>
    </table>
  );
}

/**
 * Functional component that is the root element of the package manager UI.
 *
 * @param {{packageManager: IPackageManager}} props The component's properties.
 * @param {IPackageManager} props.packageManager The package manager to use.
 * @returns {React.Fragment} The component.
 */
export function PackageManagerUi({ packageManager }: { packageManager: IPackageManager }) {
  const [viewState, setViewState] = useState<ViewState>(new MainViewState());
  const returnToMainView = useCallback(() => setViewState(new MainViewState()), []);
  const toDetailView = useCallback((packageName: string) => setViewState(new PackageDetailViewState(packageName)), []);
  if (viewState.type === 'details') {
    const repoData = packageManager.getRepositoryData();
    const packageDetails = repoData.find((entry) => entry.packageName === viewState.package);
    if (packageDetails === undefined) {
      console.error(`No package details for package ${viewState.package} found.`);
      returnToMainView();
      return <PackageManagerMainView packageManager={packageManager} toPackageDetailView={toDetailView} />;
    }
    return <PackageDetailView packageDetails={packageDetails} returnToMainViewCallback={returnToMainView} />;
  } else {
    return <PackageManagerMainView packageManager={packageManager} toPackageDetailView={toDetailView} />;
  }
}

class PackageDetailViewState {
  public readonly type = 'details' as const;
  public readonly package: string;

  constructor(pkg: string) {
    this.package = pkg;
  }
}

class MainViewState {
  public readonly type = 'main' as const;
}

type ViewState = PackageDetailViewState | MainViewState;

function PackageDetailView({
  packageDetails,
  returnToMainViewCallback,
}: {
  packageDetails: PackageEntry;
  returnToMainViewCallback: () => void;
}) {
  return (
    <>
      <LargeButton onClick={returnToMainViewCallback} text="Return to package listing" />
      <h1>{packageDetails.name}</h1>
      <p>{packageDetails.description}</p>
      {packageDetails.dependencies.length > 0 ? (
        <>
          <p>Dependencies:</p>
          <ul>
            {packageDetails.dependencies.map((dependency) => (
              <li key={dependency}>{dependency}</li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}

function PackageManagerMainView({
  packageManager,
  toPackageDetailView,
}: {
  packageManager: IPackageManager;
  toPackageDetailView: (packageName: string) => void;
}) {
  const [repositoryData, setRepositoryData] = useState(packageManager.getRepositoryData());
  const [installedPackages, setInstalledPackages] = useState(getInstalledPackages(packageManager));

  useEffect(() => {
    packageManager.onUpdateFinished((data) => {
      setRepositoryData(data);
      setInstalledPackages(getInstalledPackages(packageManager));
    });

    packageManager.onPackageOperationDone((operation, packageName) => {
      let installedState = installedPackages[packageName];
      if (operation === 'install') {
        installedState = true;
      } else if (operation === 'uninstall') {
        installedState = false;
      }
      setInstalledPackages({ ...installedPackages, [packageName]: installedState });
    });
  }, [packageManager]);

  return (
    <>
      <LargeButton
        onClick={() => {
          packageManager.updateAsync();
        }}
        text="Update package listing"
      />
      <PackageListing
        installedPackages={installedPackages}
        packageManager={packageManager}
        repositoryData={repositoryData}
        toPackageDetailView={toPackageDetailView}
      />
    </>
  );
}
